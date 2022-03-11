import { Article } from "./models/Article.js";

const listAll = async function (req, res) {
  console.log("List all articles");

  const articles = await Article.find({});

  return res.status(200).json(articles);
};

const filterByName = async function (req, res) {
  const name = getParam(req, "name");
  console.log("List by name : name=" + name);

  const articles = await Article.find({ name: { $regex: name } });

  return res.status(200).json(articles);
};

const get = async function (req, res) {
  const id = getId(req);
  console.log("Get article : id=" + id);

  const article = await Article.findById(id);

  if (!article) {
    return res
      .status(404)
      .json({ error: "L'article avec l'id \"" + id + "\" n'existe pas." });
  }

  return res.status(200).json(article);
};

const getRandom = async function (req, res) {
  const articles = await Article.find({});
  const article = articles[Math.floor(Math.random() * articles.length)];

  return res.status(200).json(article);
};

const create = async function (req, res) {
  const article = req.body;
  const name = article.name;
  const price = article.price;

  console.log("Create article : name=" + name + ", price=" + price);

  const found = await Article.findOne({ name: name });

  if (found) {
    return res
      .status(409)
      .json({ error: "L'article \"" + name + '" existe déjà.' });
  }

  const art = new Article(req.body);

  await art.save()

  return res.status(200).json(art);
};

const update = async function (req, res) {
  const id = getId(req);
  console.log("Update article : id=" + id);

  const article = req.body;

  const art = await Article.findByIdAndUpdate(id, article, {
    returnOriginal: false,
  });

  if (!art) {
    return res
      .status(404)
      .json({ error: "L'article avec l'id \"" + id + "\" n'existe pas." });
  }

  return res.status(200).json(art);
};

const del = async function (req, res) {
  const id = getId(req);
  console.log("Delete article : id=" + id);

  Article.findByIdAndDelete(id, function (err, deleted) {
    if (err) {
      return res
        .status(404)
        .json({ error: "L'article avec l'id \"" + id + "\" n'existe pas." });
    } else {
      return res.status(200).json(deleted);
    }
  });
};

function getParam(req, param) {
  return req.params[param];
}

function getId(req) {
  return getParam(req, "id");
}

export { listAll, filterByName, update, create, getRandom, del, get };
