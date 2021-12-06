import * as tweetRepository from "../data/tweet.js";

export async function getAll(req, res) {
  try {
    const username = req.query.username;
    const data = username
      ? await tweetRepository.getAllByUsername(username)
      : await tweetRepository.getAll();
    res.status(200).json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: `Error: ${err.message}` });
  }
}

export async function getById(req, res) {
  try {
    const id = req.params.id;
    const tweet = await tweetRepository.getById(id);
    if (tweet) {
      res.status(200).json(tweet);
    } else {
      res.status(404).json({ message: `tweet id ${id} Not Found!` });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: `Error: ${err.message}` });
  }
}

export async function create(req, res) {
  try {
    const { text } = req.body;
    const userId = req.userId;
    const tweets = await tweetRepository.create(text, userId);

    res.status(201).json(tweets);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: `Error: ${err.message}` });
  }
}

export async function update(req, res) {
  try {
    const id = req.params.id;
    const text = req.body.text;

    const tweet = await tweetRepository.getById(id);
    if (!tweet) {
      res.status(404).json({ message: `tweet ${id} Not Found!` });
    }
    if (tweet.userId !== req.userId) {
      res.status(403).json({ message: `Forbidden!` });
    }

    const updated = await tweetRepository.update(id, text);
    res.status(200).json(updated);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: `Error: ${err.message}` });
  }
}

export async function remove(req, res) {
  try {
    const id = req.params.id;

    const tweet = await tweetRepository.getById(id);
    if (!tweet) {
      res.status(404).json({ message: `tweet id ${id} Not Found!` });
    }
    if (tweet.userId !== req.userId) {
      res.status(403).json({ message: `Forbidden!` });
    }

    tweetRepository.remove(id);
    res.status(204).json({ message: `Successfully Deleted` });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: `Error: ${err.message}` });
  }
}
