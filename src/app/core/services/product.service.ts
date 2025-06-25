// product sevice
import { Injectable, inject, signal } from '@angular/core';
import { DatabaseService } from '../../core/local-first/services/db.service';
import { COLLECTIONS_NAMES } from '../../core/local-first/schema/collectionSettings';
import { IProduct, ProductWithBaseDoc } from '../../core/local-first/schema/models/product/product.schema';
import { RxDocument, MangoQuery } from 'rxdb';
import { UpdateDocType } from '../../core/local-first/types/doc.models';
import { CommonService } from '../../common/services/common.service';
import { TranslocoService } from '@jsverse/transloco';
import { rxResource } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class ProductService {
    private dbService = inject(DatabaseService);
    private commonService = inject(CommonService);
    private transloco = inject(TranslocoService);

    productsCollection = this.dbService.db.collections.products;

    productsQuery = signal<MangoQuery<IProduct>>({
        selector: {},
        sort: [{ name: 'asc' }],
        limit: 20,
        skip: 0
    });

    products = rxResource({
        request: () => this.productsQuery(),
        loader: ({ request }) => this.productsCollection.find(request).$,
        defaultValue: []
    });
    add_onCollection = this.dbService.db.collections.add_ons;
    addOnsQuery = signal<MangoQuery<IProduct>>({
        selector: {},
        sort: [{ name: 'asc' }],
        limit: 20,
        skip: 0
    });
    addOns = rxResource({
        request: () => this.addOnsQuery(),
        loader: ({ request }) => this.add_onCollection.find(request).$,
        defaultValue: []
    });

    categoriesCollection = this.dbService.db.collections.categories;
    categoriesQuery = signal<MangoQuery<IProduct>>({
        selector: {},
        sort: [{ name: 'asc' }],
        limit: 20,
        skip: 0
    });
    categories = rxResource({
        request: () => this.categoriesQuery(),
        loader: ({ request }) => this.categoriesCollection.find(request).$,
        defaultValue: []
    });
    ingredientsCollection = this.dbService.db.collections.ingredients;
    ingredientsQuery = signal<MangoQuery<IProduct>>({
        selector: {},
        sort: [{ name: 'asc' }],
        limit: 20,
        skip: 0
    });
    ingredients = rxResource({
        request: () => this.ingredientsQuery(),
        loader: ({ request }) => this.ingredientsCollection.find(request).$,
        defaultValue: []
    });

    constructor() { }
}