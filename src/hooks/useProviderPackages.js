import { useState, useMemo } from "react";
import { useFetch } from "./useFetch";

export const useProviderPackages = (provider) => {
  const { data: packages, loading, error } = useFetch(`http://localhost:3000/products?provider=${provider}`);
  const [packageType, setPackageType] = useState("Jenis Paket");

  const filteredPackages = useMemo(() => {
    if (packageType === "Jenis Paket") return packages;
    return packages.filter(pkg => 
      Array.isArray(pkg.packageType)
        ? pkg.packageType.includes(packageType)
        : pkg.packageType === packageType
    );
  }, [packages, packageType]);

  return { filteredPackages, packageType, setPackageType, loading, error };
};
