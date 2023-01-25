type FoundyAction = {
  _id: string;
  img: string;
  name: string;
  system: {
    actionCategory: {
      value: string;
    };
    actionType: {
      value: string;
    };
    actions: {
      value: string;
    };
    description: {
      value: string;
    };
    requirements: {
      value: string;
    };
    rules: any[];
    source: {
      value: string;
    };
    traits: {
      custom: string;
      rarity: string;
      value: any[];
    };
    trigger: {
      value: string;
    };
    weapon: {
      value: string;
    };
  };
  type: "action";
};

export function mapAction(entity) {}
