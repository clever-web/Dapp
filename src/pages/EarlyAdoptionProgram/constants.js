export const PROGRAM_TYPE = [
  { tier: "default", threshold: 0, multiplier: 0.0 },
  { tier: "silver", threshold: 2500, multiplier: 0.5 },
  { tier: "gold", threshold: 10000, multiplier: 0.7 },
  { tier: "diamond", threshold: 35000, multiplier: 1.2 },
  { tier: "black", threshold: 50000, multiplier: 2 },
];

export const getProgramInfoByType = (type) => {
  return (
    PROGRAM_TYPE.find((element) => element.tier === type) ?? {
      tier: "default",
      multiplier: 0,
      threshold: 0,
    }
  );
};