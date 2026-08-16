import { NextResponse } from "next/server";
import { db } from "@/db";
import {
  brands, products, vehicleMakes, vehicleModels, vehicleTrims,
  vehicleTireSizes, customers, suppliers
} from "@/db/schema";
import { hashPassword } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { sql } from "drizzle-orm";

export async function POST() {
  try {
    // Check if already seeded
    const [existing] = await db.select({ count: sql<number>`count(*)::int` }).from(brands);
    if (existing && existing.count > 0) {
      return NextResponse.json({ message: "Already seeded" });
    }

    // Create brands
    const brandData = [
      { name: "Michelin", description: "French multinational tire manufacturer" },
      { name: "Bridgestone", description: "Japanese multinational tire manufacturer" },
      { name: "Continental", description: "German automotive manufacturing company" },
      { name: "Goodyear", description: "American multinational tire company" },
      { name: "Pirelli", description: "Italian tire manufacturer" },
      { name: "Yokohama", description: "Japanese tire manufacturer" },
      { name: "Cooper", description: "American tire company" },
      { name: "Hankook", description: "South Korean tire company" },
      { name: "BFGoodrich", description: "American tire brand" },
      { name: "Falken", description: "Japanese tire brand" },
    ];

    const insertedBrands = await db
      .insert(brands)
      .values(brandData.map((b) => ({ ...b, slug: slugify(b.name) })))
      .returning();

    const brandMap = Object.fromEntries(insertedBrands.map((b) => [b.name, b.id]));

    // Create suppliers
    await db.insert(suppliers).values([
      { name: "Tire Distribution Inc", code: "TDI", feedFormat: "csv", isActive: true },
      { name: "National Tire Warehouse", code: "NTW", feedFormat: "xml", isActive: true },
    ]);

    // Create vehicle makes
    const makeData = ["Toyota", "Honda", "Ford", "Chevrolet", "BMW", "Mercedes-Benz", "Tesla", "Nissan", "Hyundai", "Subaru", "Audi", "Volkswagen", "Mazda", "Kia", "Jeep"];
    const insertedMakes = await db
      .insert(vehicleMakes)
      .values(makeData.map((name) => ({ name })))
      .returning();
    const makeMap = Object.fromEntries(insertedMakes.map((m) => [m.name, m.id]));

    // Define tire sizes that match our products
    const commonSizes = [
      "215/55R17", "225/45R18", "235/45R18", "225/65R17", "265/70R17",
      "195/65R15", "225/50R17", "235/40R19", "255/35R19", "255/45R19"
    ];

    // Create models and trims for years 2020-2026
    const years = [2026, 2025, 2024, 2023, 2022, 2021, 2020];
    
    const vehicleData: Record<string, { name: string; trims: { name: string; tireSize: string }[] }[]> = {
      Toyota: [
        { name: "Camry", trims: [
          { name: "LE", tireSize: "215/55R17" },
          { name: "SE", tireSize: "235/45R18" },
          { name: "XLE", tireSize: "235/45R18" },
          { name: "XSE", tireSize: "235/40R19" },
        ]},
        { name: "RAV4", trims: [
          { name: "LE", tireSize: "225/65R17" },
          { name: "XLE", tireSize: "225/65R17" },
          { name: "Adventure", tireSize: "225/65R17" },
        ]},
        { name: "Corolla", trims: [
          { name: "L", tireSize: "195/65R15" },
          { name: "LE", tireSize: "195/65R15" },
          { name: "SE", tireSize: "225/45R18" },
        ]},
        { name: "Highlander", trims: [
          { name: "LE", tireSize: "225/65R17" },
          { name: "XLE", tireSize: "225/65R17" },
        ]},
      ],
      Honda: [
        { name: "Civic", trims: [
          { name: "LX", tireSize: "215/55R17" },
          { name: "Sport", tireSize: "235/45R18" },
          { name: "Si", tireSize: "235/40R19" },
          { name: "Type R", tireSize: "255/35R19" },
        ]},
        { name: "Accord", trims: [
          { name: "LX", tireSize: "225/50R17" },
          { name: "Sport", tireSize: "235/45R18" },
          { name: "Touring", tireSize: "235/40R19" },
        ]},
        { name: "CR-V", trims: [
          { name: "LX", tireSize: "225/65R17" },
          { name: "EX", tireSize: "225/65R17" },
          { name: "Touring", tireSize: "235/45R18" },
        ]},
        { name: "Pilot", trims: [
          { name: "LX", tireSize: "225/65R17" },
          { name: "EX-L", tireSize: "225/65R17" },
        ]},
      ],
      Ford: [
        { name: "F-150", trims: [
          { name: "XL", tireSize: "265/70R17" },
          { name: "XLT", tireSize: "265/70R17" },
          { name: "Lariat", tireSize: "265/70R17" },
          { name: "Raptor", tireSize: "265/70R17" },
        ]},
        { name: "Mustang", trims: [
          { name: "EcoBoost", tireSize: "235/45R18" },
          { name: "GT", tireSize: "255/35R19" },
          { name: "Mach 1", tireSize: "255/35R19" },
        ]},
        { name: "Explorer", trims: [
          { name: "Base", tireSize: "225/65R17" },
          { name: "XLT", tireSize: "225/65R17" },
          { name: "Limited", tireSize: "255/45R19" },
        ]},
        { name: "Escape", trims: [
          { name: "S", tireSize: "225/65R17" },
          { name: "SE", tireSize: "225/65R17" },
        ]},
      ],
      Chevrolet: [
        { name: "Silverado", trims: [
          { name: "WT", tireSize: "265/70R17" },
          { name: "LT", tireSize: "265/70R17" },
          { name: "RST", tireSize: "265/70R17" },
        ]},
        { name: "Equinox", trims: [
          { name: "LS", tireSize: "225/65R17" },
          { name: "LT", tireSize: "225/65R17" },
        ]},
        { name: "Malibu", trims: [
          { name: "LS", tireSize: "215/55R17" },
          { name: "RS", tireSize: "235/45R18" },
        ]},
      ],
      BMW: [
        { name: "3 Series", trims: [
          { name: "330i", tireSize: "225/45R18" },
          { name: "330i xDrive", tireSize: "225/45R18" },
          { name: "M340i", tireSize: "255/35R19" },
        ]},
        { name: "5 Series", trims: [
          { name: "530i", tireSize: "225/45R18" },
          { name: "540i", tireSize: "255/35R19" },
        ]},
        { name: "X3", trims: [
          { name: "sDrive30i", tireSize: "225/65R17" },
          { name: "xDrive30i", tireSize: "225/65R17" },
          { name: "M40i", tireSize: "255/45R19" },
        ]},
        { name: "X5", trims: [
          { name: "xDrive40i", tireSize: "255/45R19" },
          { name: "xDrive50e", tireSize: "255/45R19" },
        ]},
      ],
      Tesla: [
        { name: "Model 3", trims: [
          { name: "Standard Range", tireSize: "235/45R18" },
          { name: "Long Range", tireSize: "235/40R19" },
          { name: "Performance", tireSize: "235/40R19" },
        ]},
        { name: "Model Y", trims: [
          { name: "Long Range", tireSize: "255/45R19" },
          { name: "Performance", tireSize: "255/35R19" },
        ]},
        { name: "Model S", trims: [
          { name: "Long Range", tireSize: "255/35R19" },
          { name: "Plaid", tireSize: "255/35R19" },
        ]},
      ],
      Nissan: [
        { name: "Altima", trims: [
          { name: "S", tireSize: "215/55R17" },
          { name: "SV", tireSize: "215/55R17" },
          { name: "SR", tireSize: "235/40R19" },
        ]},
        { name: "Rogue", trims: [
          { name: "S", tireSize: "225/65R17" },
          { name: "SV", tireSize: "225/65R17" },
          { name: "Platinum", tireSize: "235/45R18" },
        ]},
        { name: "Sentra", trims: [
          { name: "S", tireSize: "195/65R15" },
          { name: "SV", tireSize: "215/55R17" },
        ]},
      ],
      Hyundai: [
        { name: "Elantra", trims: [
          { name: "SE", tireSize: "195/65R15" },
          { name: "SEL", tireSize: "215/55R17" },
          { name: "N Line", tireSize: "235/40R19" },
        ]},
        { name: "Tucson", trims: [
          { name: "SE", tireSize: "225/65R17" },
          { name: "SEL", tireSize: "225/65R17" },
          { name: "Limited", tireSize: "235/45R18" },
        ]},
        { name: "Sonata", trims: [
          { name: "SE", tireSize: "215/55R17" },
          { name: "SEL", tireSize: "235/45R18" },
        ]},
      ],
      Subaru: [
        { name: "Outback", trims: [
          { name: "Base", tireSize: "225/65R17" },
          { name: "Premium", tireSize: "225/65R17" },
          { name: "Limited", tireSize: "225/65R17" },
        ]},
        { name: "Forester", trims: [
          { name: "Base", tireSize: "225/65R17" },
          { name: "Premium", tireSize: "225/65R17" },
        ]},
        { name: "Crosstrek", trims: [
          { name: "Base", tireSize: "225/65R17" },
          { name: "Premium", tireSize: "225/65R17" },
        ]},
        { name: "WRX", trims: [
          { name: "Base", tireSize: "235/45R18" },
          { name: "Premium", tireSize: "235/45R18" },
          { name: "GT", tireSize: "235/40R19" },
        ]},
      ],
      Audi: [
        { name: "A4", trims: [
          { name: "Premium", tireSize: "225/50R17" },
          { name: "Premium Plus", tireSize: "235/45R18" },
          { name: "S Line", tireSize: "255/35R19" },
        ]},
        { name: "Q5", trims: [
          { name: "Premium", tireSize: "225/65R17" },
          { name: "Premium Plus", tireSize: "235/45R18" },
        ]},
        { name: "A6", trims: [
          { name: "Premium", tireSize: "235/45R18" },
          { name: "Premium Plus", tireSize: "255/35R19" },
        ]},
      ],
      Volkswagen: [
        { name: "Jetta", trims: [
          { name: "S", tireSize: "195/65R15" },
          { name: "SE", tireSize: "215/55R17" },
          { name: "GLI", tireSize: "235/40R19" },
        ]},
        { name: "Tiguan", trims: [
          { name: "S", tireSize: "225/65R17" },
          { name: "SE", tireSize: "225/65R17" },
        ]},
        { name: "Golf GTI", trims: [
          { name: "S", tireSize: "225/45R18" },
          { name: "Autobahn", tireSize: "235/40R19" },
        ]},
      ],
      Mazda: [
        { name: "Mazda3", trims: [
          { name: "Base", tireSize: "215/55R17" },
          { name: "Select", tireSize: "215/55R17" },
          { name: "Turbo", tireSize: "235/45R18" },
        ]},
        { name: "CX-5", trims: [
          { name: "Sport", tireSize: "225/65R17" },
          { name: "Preferred", tireSize: "225/65R17" },
          { name: "Turbo", tireSize: "235/45R18" },
        ]},
        { name: "MX-5 Miata", trims: [
          { name: "Sport", tireSize: "195/65R15" },
          { name: "Grand Touring", tireSize: "215/55R17" },
        ]},
      ],
      Kia: [
        { name: "Forte", trims: [
          { name: "FE", tireSize: "195/65R15" },
          { name: "LXS", tireSize: "215/55R17" },
          { name: "GT", tireSize: "235/45R18" },
        ]},
        { name: "Sportage", trims: [
          { name: "LX", tireSize: "225/65R17" },
          { name: "EX", tireSize: "225/65R17" },
          { name: "SX", tireSize: "235/45R18" },
        ]},
        { name: "K5", trims: [
          { name: "LX", tireSize: "215/55R17" },
          { name: "GT-Line", tireSize: "235/45R18" },
          { name: "GT", tireSize: "235/40R19" },
        ]},
      ],
      Jeep: [
        { name: "Wrangler", trims: [
          { name: "Sport", tireSize: "265/70R17" },
          { name: "Sahara", tireSize: "265/70R17" },
          { name: "Rubicon", tireSize: "265/70R17" },
        ]},
        { name: "Grand Cherokee", trims: [
          { name: "Laredo", tireSize: "225/65R17" },
          { name: "Limited", tireSize: "255/45R19" },
          { name: "Trailhawk", tireSize: "265/70R17" },
        ]},
        { name: "Cherokee", trims: [
          { name: "Latitude", tireSize: "225/65R17" },
          { name: "Limited", tireSize: "225/65R17" },
        ]},
      ],
    };

    // Insert models and trims for each year
    for (const [makeName, models] of Object.entries(vehicleData)) {
      const makeId = makeMap[makeName];
      if (!makeId) continue;

      for (const model of models) {
        const [insertedModel] = await db
          .insert(vehicleModels)
          .values({ makeId, name: model.name })
          .returning();

        // Create trims for each year 2020-2026
        for (const year of years) {
          for (const trim of model.trims) {
            const [insertedTrim] = await db
              .insert(vehicleTrims)
              .values({ modelId: insertedModel.id, year, name: trim.name })
              .returning();

            await db
              .insert(vehicleTireSizes)
              .values({ trimId: insertedTrim.id, tireSize: trim.tireSize });
          }
        }
      }
    }

    // Create products for all tire sizes
    const tireProducts = [
      // 215/55R17 - Very common sedan size
      { brand: "Michelin", name: "Michelin Defender T+H", width: 215, ar: 55, wd: 17, season: "all-season", perf: "Standard Touring", li: 94, sr: "H", tw: 820, price: "139.99", stock: 100, warranty: 80000, desc: "Longest-lasting all-season tire with fuel efficiency." },
      { brand: "Continental", name: "Continental TrueContact Tour", width: 215, ar: 55, wd: 17, season: "all-season", perf: "Standard Touring", li: 94, sr: "H", tw: 800, price: "134.99", stock: 80, warranty: 80000, desc: "Confident all-season traction with long tread life." },
      { brand: "Bridgestone", name: "Bridgestone Turanza QuietTrack", width: 215, ar: 55, wd: 17, season: "all-season", perf: "Grand Touring", li: 94, sr: "V", tw: 740, price: "149.99", stock: 60, warranty: 80000, desc: "Premium quiet riding all-season tire." },
      
      // 225/45R18 - Popular performance size
      { brand: "Michelin", name: "Michelin Pilot Sport 4S", width: 225, ar: 45, wd: 18, season: "summer", perf: "Ultra High Performance", li: 95, sr: "Y", tw: 300, price: "189.99", stock: 64, warranty: 30000, desc: "Exceptional dry and wet grip for sports cars and sedans." },
      { brand: "Continental", name: "Continental ExtremeContact DWS06 Plus", width: 225, ar: 45, wd: 18, season: "all-season", perf: "Ultra High Performance", li: 95, sr: "W", tw: 560, price: "169.99", stock: 48, warranty: 50000, desc: "Year-round performance with excellent tread life." },
      { brand: "Bridgestone", name: "Bridgestone Potenza RE980AS+", width: 225, ar: 45, wd: 18, season: "all-season", perf: "High Performance", li: 95, sr: "W", tw: 500, price: "155.99", stock: 40, warranty: 50000, desc: "Responsive handling in all weather conditions." },
      { brand: "Pirelli", name: "Pirelli P Zero All Season Plus 3", width: 225, ar: 45, wd: 18, season: "all-season", perf: "Ultra High Performance", li: 95, sr: "Y", tw: 400, price: "179.99", sale: "159.99", stock: 36, warranty: 50000, desc: "Premium all-season performance tire." },

      // 235/45R18 - Common sporty sedan size
      { brand: "Michelin", name: "Michelin Primacy MXM4", width: 235, ar: 45, wd: 18, season: "all-season", perf: "Grand Touring", li: 98, sr: "H", tw: 500, price: "199.99", stock: 56, warranty: 55000, desc: "Quiet, comfortable, long-lasting all-season tire." },
      { brand: "Goodyear", name: "Goodyear Eagle F1 Asymmetric 3", width: 235, ar: 45, wd: 18, season: "summer", perf: "Ultra High Performance", li: 98, sr: "Y", tw: 280, price: "175.99", sale: "149.99", stock: 44, warranty: 45000, desc: "Ultra-high performance summer tire with precise handling." },
      { brand: "Yokohama", name: "Yokohama ADVAN Sport A/S+", width: 235, ar: 45, wd: 18, season: "all-season", perf: "Ultra High Performance", li: 98, sr: "W", tw: 500, price: "164.99", stock: 32, warranty: 50000, desc: "All-season performance with sporty handling." },
      { brand: "Hankook", name: "Hankook Ventus V2 Concept2", width: 235, ar: 45, wd: 18, season: "all-season", perf: "High Performance", li: 98, sr: "W", tw: 500, price: "129.99", stock: 52, warranty: 45000, desc: "Affordable high performance all-season." },

      // 225/65R17 - Popular SUV/CUV size
      { brand: "Michelin", name: "Michelin Defender LTX M/S 2", width: 225, ar: 65, wd: 17, season: "all-season", perf: "Highway All-Season", li: 102, sr: "H", tw: 800, price: "175.99", stock: 80, warranty: 70000, desc: "All-season tire for light trucks and SUVs." },
      { brand: "Continental", name: "Continental CrossContact LX25", width: 225, ar: 65, wd: 17, season: "all-season", perf: "Crossover/SUV Touring", li: 102, sr: "H", tw: 740, price: "159.99", stock: 64, warranty: 70000, desc: "Premium CUV tire with EcoPlus technology." },
      { brand: "Bridgestone", name: "Bridgestone Dueler H/L Alenza Plus", width: 225, ar: 65, wd: 17, season: "all-season", perf: "Crossover/SUV Touring", li: 102, sr: "H", tw: 700, price: "169.99", stock: 48, warranty: 80000, desc: "Premium highway tire for SUVs and crossovers." },
      { brand: "Goodyear", name: "Goodyear Assurance WeatherReady", width: 225, ar: 65, wd: 17, season: "all-season", perf: "Crossover/SUV Touring", li: 102, sr: "H", tw: 700, price: "174.99", stock: 56, warranty: 60000, desc: "All-weather confidence for SUVs." },

      // 265/70R17 - Truck/Off-road size
      { brand: "BFGoodrich", name: "BFGoodrich All-Terrain T/A KO2", width: 265, ar: 70, wd: 17, season: "all-terrain", perf: "All-Terrain", li: 121, sr: "S", tw: 0, price: "249.99", stock: 40, warranty: 50000, desc: "Legendary off-road capability with on-road comfort." },
      { brand: "Goodyear", name: "Goodyear Wrangler DuraTrac RT", width: 265, ar: 70, wd: 17, season: "all-terrain", perf: "Rugged Terrain", li: 121, sr: "S", tw: 0, price: "239.99", stock: 32, warranty: 60000, desc: "Aggressive tread for on and off-road adventures." },
      { brand: "Falken", name: "Falken Wildpeak A/T3W", width: 265, ar: 70, wd: 17, season: "all-terrain", perf: "All-Terrain", li: 121, sr: "S", tw: 0, price: "179.99", stock: 48, warranty: 55000, desc: "All-weather all-terrain tire with rugged durability." },
      { brand: "Cooper", name: "Cooper Discoverer AT3 XLT", width: 265, ar: 70, wd: 17, season: "all-terrain", perf: "All-Terrain", li: 121, sr: "S", tw: 0, price: "199.99", stock: 36, warranty: 60000, desc: "Extreme terrain performance for trucks." },

      // 195/65R15 - Economy car size
      { brand: "Michelin", name: "Michelin Energy Saver A/S 2", width: 195, ar: 65, wd: 15, season: "all-season", perf: "Standard Touring", li: 91, sr: "H", tw: 740, price: "119.99", stock: 72, warranty: 65000, desc: "Fuel-efficient all-season tire for compact cars." },
      { brand: "Hankook", name: "Hankook Kinergy PT H737", width: 195, ar: 65, wd: 15, season: "all-season", perf: "Standard Touring", li: 91, sr: "H", tw: 700, price: "89.99", stock: 64, warranty: 90000, desc: "Long-wearing all-season touring tire." },
      { brand: "Cooper", name: "Cooper CS5 Ultra Touring", width: 195, ar: 65, wd: 15, season: "all-season", perf: "Standard Touring", li: 91, sr: "H", tw: 700, price: "99.99", stock: 56, warranty: 70000, desc: "Dependable touring performance." },

      // 225/50R17
      { brand: "Pirelli", name: "Pirelli Cinturato P7 All Season Plus 2", width: 225, ar: 50, wd: 17, season: "all-season", perf: "Grand Touring", li: 98, sr: "V", tw: 700, price: "159.99", stock: 48, warranty: 70000, desc: "Premium grand touring all-season tire." },
      { brand: "Continental", name: "Continental PureContact LS", width: 225, ar: 50, wd: 17, season: "all-season", perf: "Grand Touring", li: 98, sr: "V", tw: 700, price: "154.99", stock: 40, warranty: 70000, desc: "Eco-friendly touring tire." },

      // 235/40R19 - Sports sedan size
      { brand: "Michelin", name: "Michelin Pilot Sport 4S 19", width: 235, ar: 40, wd: 19, season: "summer", perf: "Max Performance Summer", li: 96, sr: "Y", tw: 300, price: "269.99", stock: 32, warranty: 30000, desc: "Track-proven performance for the street." },
      { brand: "Continental", name: "Continental ExtremeContact Sport 02", width: 235, ar: 40, wd: 19, season: "summer", perf: "Max Performance Summer", li: 96, sr: "Y", tw: 340, price: "229.99", sale: "209.99", stock: 28, warranty: 30000, desc: "Extreme performance on dry and wet roads." },
      { brand: "Pirelli", name: "Pirelli P Zero PZ4", width: 235, ar: 40, wd: 19, season: "summer", perf: "Max Performance Summer", li: 96, sr: "Y", tw: 300, price: "259.99", stock: 24, warranty: 0, desc: "OE-quality max performance summer tire." },

      // 255/35R19 - High performance size
      { brand: "Michelin", name: "Michelin Pilot Sport Cup 2", width: 255, ar: 35, wd: 19, season: "summer", perf: "Extreme Performance Summer", li: 96, sr: "Y", tw: 180, price: "379.99", stock: 20, warranty: 0, desc: "Track-ready extreme performance tire." },
      { brand: "Hankook", name: "Hankook Ventus S1 evo3", width: 255, ar: 35, wd: 19, season: "summer", perf: "Max Performance Summer", li: 96, sr: "Y", tw: 300, price: "209.99", stock: 24, warranty: 0, desc: "Maximum performance summer tire for sports cars." },
      { brand: "Goodyear", name: "Goodyear Eagle F1 SuperSport", width: 255, ar: 35, wd: 19, season: "summer", perf: "Max Performance Summer", li: 96, sr: "Y", tw: 220, price: "299.99", stock: 20, warranty: 0, desc: "Supercar-level performance." },

      // 255/45R19 - Luxury SUV size
      { brand: "Yokohama", name: "Yokohama Geolandar X-CV", width: 255, ar: 45, wd: 19, season: "all-season", perf: "Crossover/SUV Touring", li: 104, sr: "W", tw: 600, price: "189.99", stock: 36, warranty: 65000, desc: "Premium highway tire for luxury SUVs and crossovers." },
      { brand: "Pirelli", name: "Pirelli Scorpion Verde All Season Plus 2", width: 255, ar: 45, wd: 19, season: "all-season", perf: "Crossover/SUV Touring", li: 104, sr: "W", tw: 640, price: "199.99", stock: 32, warranty: 65000, desc: "Eco-friendly luxury SUV touring tire." },
      { brand: "Continental", name: "Continental CrossContact LX Sport", width: 255, ar: 45, wd: 19, season: "all-season", perf: "Crossover/SUV Touring", li: 104, sr: "W", tw: 560, price: "209.99", stock: 28, warranty: 65000, desc: "Sporty handling for luxury CUVs." },

      // Winter tires
      { brand: "Michelin", name: "Michelin X-Ice Snow", width: 225, ar: 45, wd: 18, season: "winter", perf: "Studless Ice & Snow", li: 95, sr: "H", tw: 0, price: "199.99", stock: 40, warranty: 40000, desc: "Exceptional winter traction on ice and snow." },
      { brand: "Bridgestone", name: "Bridgestone Blizzak WS90", width: 215, ar: 55, wd: 17, season: "winter", perf: "Studless Ice & Snow", li: 94, sr: "T", tw: 0, price: "149.99", sale: "129.99", stock: 36, warranty: 0, desc: "Advanced winter tire with Multi-Cell compound." },
      { brand: "Continental", name: "Continental VikingContact 7", width: 235, ar: 45, wd: 18, season: "winter", perf: "Studless Ice & Snow", li: 98, sr: "T", tw: 0, price: "189.99", stock: 32, warranty: 0, desc: "Nordic winter tire with excellent ice performance." },
      { brand: "Goodyear", name: "Goodyear WinterCommand Ultra", width: 225, ar: 65, wd: 17, season: "winter", perf: "Studless Ice & Snow", li: 102, sr: "T", tw: 0, price: "159.99", stock: 28, warranty: 0, desc: "Confident winter traction for CUVs." },
    ];

    for (const tire of tireProducts) {
      const brandId = brandMap[tire.brand];
      if (!brandId) continue;

      const tireSize = `${tire.width}/${tire.ar}R${tire.wd}`;
      const sku = `${tire.brand.substring(0, 3).toUpperCase()}-${tire.width}${tire.ar}${tire.wd}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

      await db.insert(products).values({
        name: tire.name,
        sku,
        slug: slugify(`${tire.name}-${tireSize}`),
        brandId,
        description: tire.desc,
        imageUrl: null,
        width: tire.width,
        aspectRatio: tire.ar,
        wheelDiameter: tire.wd,
        tireSize,
        season: tire.season,
        performanceCategory: tire.perf,
        loadIndex: tire.li,
        speedRating: tire.sr,
        treadwear: tire.tw || null,
        warrantyMiles: tire.warranty || null,
        price: tire.price,
        salePrice: (tire as Record<string, unknown>).sale as string || null,
        stockQty: tire.stock,
      });
    }

    // Create admin user
    const adminHash = await hashPassword("admin123");
    await db.insert(customers).values({
      email: "admin@tirerakpro.com",
      passwordHash: adminHash,
      firstName: "Admin",
      lastName: "User",
      isAdmin: true,
    });

    // Create demo customer
    const demoHash = await hashPassword("demo1234");
    await db.insert(customers).values({
      email: "demo@example.com",
      passwordHash: demoHash,
      firstName: "John",
      lastName: "Smith",
    });

    return NextResponse.json({
      message: "Seeded successfully",
      stats: {
        brands: brandData.length,
        products: tireProducts.length,
        makes: makeData.length,
        yearsWithData: years.length,
      },
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Seed failed", details: error instanceof Error ? error.message : "Unknown" },
      { status: 500 }
    );
  }
}
