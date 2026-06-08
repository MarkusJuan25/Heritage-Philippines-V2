import {
  provincePackages,
  regionalPackageCategories,
} from "./philippinesPackages.js";

export const packageCategories = regionalPackageCategories;

export const tourPackages = provincePackages;

export function findPackageBySlug(slug) {
  return tourPackages.find((pkg) => pkg.slug === slug);
}

export function getRelatedPackages(packageItem) {
  if (!packageItem) return [];

  const sameRegion = tourPackages.filter(
    (item) =>
      item.slug !== packageItem.slug &&
      item.region === packageItem.region
  );

  const sameIslandGroup = tourPackages.filter(
    (item) =>
      item.slug !== packageItem.slug &&
      item.region !== packageItem.region &&
      item.islandGroup === packageItem.islandGroup
  );

  return [...sameRegion, ...sameIslandGroup].slice(0, 3);
}
