export default class Article {
  constructor(id, title, content, author) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.author_id = author;
    this.create_time = Date.now();
    this.replies = [];
  }
}