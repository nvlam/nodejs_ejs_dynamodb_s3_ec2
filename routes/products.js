const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { docClient, TABLE } = require("../db");

const {
    ScanCommand,
    GetCommand,
    PutCommand,
    UpdateCommand,
    DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");

const router = express.Router();

// LIST (Read all)
router.get("/", async (req, res) => {
    const data = await docClient.send(new ScanCommand({ TableName: TABLE }));
    res.render("index", { products: data.Items || [] });
});

// SHOW CREATE FORM
router.get("/products/new", (req, res) => {
    res.render("new");
});

// CREATE
router.post("/products", async (req, res) => {
    const id = uuidv4();
    const name = (req.body.name || "").trim();
    const price = Number(req.body.price || 0);
    const imageUrl = (req.body.imageUrl || "").trim();

    await docClient.send(
        new PutCommand({
            TableName: TABLE,
            Item: { id, name, price, imageUrl },
        })
    );

    res.redirect("/");
});

// SHOW EDIT FORM
router.get("/products/:id/edit", async (req, res) => {
    const id = req.params.id;

    const data = await docClient.send(
        new GetCommand({
            TableName: TABLE,
            Key: { id },
        })
    );

    if (!data.Item) return res.status(404).send("Not found");
    res.render("edit", { product: data.Item });
});

// UPDATE
router.put("/products/:id", async (req, res) => {
    const id = req.params.id;
    const name = (req.body.name || "").trim();
    const price = Number(req.body.price || 0);
    const imageUrl = (req.body.imageUrl || "").trim();

    await docClient.send(
        new UpdateCommand({
            TableName: TABLE,
            Key: { id },
            UpdateExpression: "SET #n = :n, price = :p, imageUrl = :i",
            ExpressionAttributeNames: { "#n": "name" },
            ExpressionAttributeValues: {
                ":n": name,
                ":p": price,
                ":i": imageUrl,
            },
        })
    );

    res.redirect("/");
});

// DELETE
router.delete("/products/:id", async (req, res) => {
    const id = req.params.id;

    await docClient.send(
        new DeleteCommand({
            TableName: TABLE,
            Key: { id },
        })
    );

    res.redirect("/");
});

module.exports = router;
