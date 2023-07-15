
export type Trait = "Attack" | "Health" | "Speed";

export type NftAttributes = {
    trait_type: Trait;
    value: string;
}

export type NftMeta = {
    description: string;
    image: string;
    name: string;
    attributes: NftAttributes[];

}