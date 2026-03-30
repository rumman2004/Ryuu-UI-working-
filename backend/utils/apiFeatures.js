// backend/utils/apiFeatures.js

class APIFeatures {
  constructor(query, queryString) {
    this.query       = query;
    this.queryString = queryString;
  }

  search() {
    if (this.queryString.search) {
      const keyword = {
        $or: [
          { name:        { $regex: this.queryString.search, $options: "i" } },
          { description: { $regex: this.queryString.search, $options: "i" } },
        ],
      };
      this.query = this.query.find(keyword);
    }
    return this;
  }

  filterByCategory() {
    if (this.queryString.category) {
      this.query = this.query.find({ category: this.queryString.category });
    }
    return this;
  }

  filterByTags() {
    if (this.queryString.tags) {
      const tagsArray = this.queryString.tags.split(",");
      this.query = this.query.find({ tags: { $in: tagsArray } });
    }
    return this;
  }

  filterByPublished() {
    // Public frontend always gets published only
    // Admin can pass ?all=true to see drafts too
    if (!this.queryString.all) {
      this.query = this.query.find({ isPublished: true });
    }
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query   = this.query.sort(sortBy);
    } else {
      // Default: newest first
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  paginate(resultsPerPage = 12) {
    const page       = Number(this.queryString.page) || 1;
    const skip       = resultsPerPage * (page - 1);
    this.query       = this.query.limit(resultsPerPage).skip(skip);
    this.currentPage = page;
    return this;
  }
}

module.exports = APIFeatures;