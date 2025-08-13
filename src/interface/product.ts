import { ProductCategory } from "./categories";

export interface Product {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: string;
    category?: ProductCategory;
    image?: string;
    rating?: number;
    slots?: number;
}