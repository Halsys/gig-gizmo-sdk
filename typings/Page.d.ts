/**
 * Created by corynull on 8/1/17.
 */
import { ModelClass } from "./Model";
export class Page extends ModelClass<any> {
		public static ModelName: string;
		public data: string;
		public metadata: string;
		public title: string;
		public link: string;
		public visits: number;
		public revisions: number;
		public hide: boolean;
		public blog: boolean;
		public doc: boolean;
		public admin: string;
		public static findMany(criteria: any): Promise<Page[]>;
		public static findOne(criteria: any): Promise<Page | null>;
		public static findById(id: string): Promise<Page | null>;
		public static findByLink(link: string): Promise<Page | null>;
		public isValid(): boolean;
		public userIsOwner(user: any): boolean;
}
