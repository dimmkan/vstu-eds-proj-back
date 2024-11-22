declare class Children {
    readonly key: string;
    readonly data: {
        readonly user_name: string;
        readonly comp_name: string;
        readonly org_name: string;
    };
}
export declare class ShowcaseLabelsDto {
    readonly key: string;
    readonly data: {
        readonly user_name: string;
        readonly comp_name: string;
        readonly org_name: string;
    };
    readonly children: Children[];
}
export {};
