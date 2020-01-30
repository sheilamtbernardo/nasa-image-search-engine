import {searchImages} from "../services/ImageSearchService";
import {action, computed, observable, runInAction} from "mobx";
import {find} from "lodash";
import moment from "moment";

class Image {
    @observable id = '';
    @observable title = '';
    @observable description = '';
    @observable thumbnail = '';
    @observable keywords = [];
    @observable date = '';

    constructor(id, title, description, thumbnail, keywords, date) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.keywords = keywords;
        this.date = date;
        this.thumbnail = thumbnail;
    }

    @computed get createdDate() {
        return moment(this.date).format("YYYY-MM-DD HH:mm:ss");
    }
}

export default class ImageStore {
    @observable images = [];
    @observable hasNext = false;
    @observable hasPrev = false;
    @observable totalHits = 0;
    @observable status = '';
    @observable filter = '';
    @observable page = 1;
    @observable rowsPerPage = 100;

    @computed get startDisplayCount() {
        return this.totalHits > 0 ? this.page * this.rowsPerPage + 1 - this.rowsPerPage : 0;
    }

    @computed get endDisplayCount() {
        return this.totalHits < this.page * this.rowsPerPage ? this.totalHits : this.page * this.rowsPerPage;
    }

    @computed get imagesLength() {
        return this.images.length;
    }

    @action nextPage() {
        this.page = this.page + 1;
    }

    @action prevPage() {
        this.page = this.page - 1;
    }

    @action
    async getImages() {
        this.images = [];
        if (this.filter) {
            await searchImages(this.filter, this.page).then(
                response => {

                    runInAction(() => {
                        this.totalHits = response.data.collection.metadata.total_hits;
                        this.hasNext = !!find(response.data.collection.links, ['rel', 'next']);
                        this.hasPrev = !!find(response.data.collection.links, ['rel', 'prev']);
                        let itemData, itemPreview;
                        response.data.collection.items.forEach(item => {
                            itemData = find(item.data, ['media_type', 'image']);
                            itemPreview = find(item.links, ['render', 'image']);
                            this.images.push(new Image(itemData.nasa_id, itemData.title, itemData.description,
                                itemPreview.href, itemData.keywords, itemData.date_created))
                        });
                        this.status = "success";
                    })
                },
                error => {
                    // the alternative ending of this process:...
                    runInAction(() => {
                        this.status = "error";
                    })
                }
            )
        }
    }

    @action
    reset() {
        this.images = [];
        this.hasNext = false;
        this.hasPrev = false;
        this.totalHits = 0;
        this.status = '';
        this.filter = '';
        this.page = 1;
    }
}