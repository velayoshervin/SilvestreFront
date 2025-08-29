import React from "react";
import ItemCard from "../../components/ItemCard";

const sampleItems = [
  {
    imageList: [
      {
        url: "https://images.unsplash.com/photo-1505238680356-667803448bb6?auto=format&fit=crop&w=400&q=80",
      }, // wedding floral centerpiece
      {
        url: "https://images.unsplash.com/photo-1486308510493-cb0a54199c66?auto=format&fit=crop&w=400&q=80",
      }, // decorated wedding reception
      {
        url: "https://images.unsplash.com/photo-1494522358652-55f2132b60ab?auto=format&fit=crop&w=400&q=80",
      }, // bride bouquet
      {
        url: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80",
      }, // wedding cake
      {
        url: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=400&q=80",
      }, // wedding ceremony arch
      {
        url: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=400&q=80",
      }, // wedding couple outdoor
      {
        url: "https://images.unsplash.com/photo-1485841890310-6a055c88698a?auto=format&fit=crop&w=400&q=80",
      }, // elegant table setting
    ],
    name: "Premium Styling Package",
    pax: "Up to 100 pax",
    recommendedfor: ["Weddings", "Anniversaries", "Gala Dinners"],
    inclusion: "Elegant event styling and floral arrangements",
    price: "20000",
  },
  {
    imageList: [
      {
        url: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=400&q=80",
      }, // professional photographer at event
      {
        url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
      }, // camera recording event
      {
        url: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80",
      }, // photo shoot with couple
      {
        url: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=80",
      }, // event coverage camera
      {
        url: "https://images.unsplash.com/photo-1497493292307-31c376b6e479?auto=format&fit=crop&w=400&q=80",
      }, // photographer taking photo
      {
        url: "https://images.unsplash.com/photo-1541542684-6a0e7f43d140?auto=format&fit=crop&w=400&q=80",
      }, // photo editing computer
      {
        url: "https://images.unsplash.com/photo-1486308510493-cb0a54199c66?auto=format&fit=crop&w=400&q=80",
      }, // studio lighting setup
    ],
    name: "Photo & Video Coverage Package",
    pax: "No limit",
    recommendedfor: ["Weddings", "Corporate Events", "Product Launches"],
    inclusion: "Professional photography and videography services",
    price: "18000",
  },
  {
    imageList: [
      {
        url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400&q=80",
      }, // buffet catering setup
      {
        url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80",
      }, // assorted food buffet
      {
        url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
      }, // catering food table
      {
        url: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?auto=format&fit=crop&w=400&q=80",
      }, // corporate event buffet
      {
        url: "https://images.unsplash.com/photo-1556911220-e15b29be8c7d?auto=format&fit=crop&w=400&q=80",
      }, // food trays at event
      {
        url: "https://images.unsplash.com/photo-1529612700005-69b260aadc98?auto=format&fit=crop&w=400&q=80",
      }, // plated food catering
      {
        url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
      }, // catering staff serving
    ],
    name: "Corporate Buffet Package",
    pax: "Up to 150 pax",
    recommendedfor: ["Corporate Meetings", "Workshops", "Seminars"],
    inclusion: "Buffet catering with assorted drinks and desserts",
    price: "22000",
  },
  {
    imageList: [
      {
        url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
      }, // birthday party balloons
      {
        url: "https://images.unsplash.com/photo-1532634726-8b3e091de4f6?auto=format&fit=crop&w=400&q=80",
      }, // birthday cake
      {
        url: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80",
      }, // kids birthday party
      {
        url: "https://images.unsplash.com/photo-1541698444083-023c97d3f4b6?auto=format&fit=crop&w=400&q=80",
      }, // party decorations
      {
        url: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=400&q=80",
      }, // party people dancing
      {
        url: "https://images.unsplash.com/photo-1494522358652-55f2132b60ab?auto=format&fit=crop&w=400&q=80",
      }, // colorful balloons
      {
        url: "https://images.unsplash.com/photo-1486308510493-cb0a54199c66?auto=format&fit=crop&w=400&q=80",
      }, // party table setting
    ],
    name: "Birthday Party Package",
    pax: "Up to 75 pax",
    recommendedfor: ["Kids' Parties", "Adult Birthdays", "Family Gatherings"],
    inclusion: "Party decorations, buffet catering, and entertainment",
    price: "13000",
  },
  {
    imageList: [
      {
        url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
      }, // elegant wedding hall
      {
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      }, // wedding floral decor
      {
        url: "https://images.unsplash.com/photo-1497493292307-31c376b6e479?auto=format&fit=crop&w=400&q=80",
      }, // wedding ceremony
      {
        url: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80",
      }, // wedding cake
      {
        url: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=400&q=80",
      }, // wedding couple
      {
        url: "https://images.unsplash.com/photo-1486308510493-cb0a54199c66?auto=format&fit=crop&w=400&q=80",
      }, // table setting
      {
        url: "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=400&q=80",
      }, // bride bouquet
    ],
    name: "All-Inclusive Wedding Package",
    pax: "Up to 200 pax",
    recommendedfor: ["Weddings"],
    inclusion: "Catering, styling, photography, and entertainment",
    price: "50000",
  },
];

const filters = {
  packages: ["Wedding", "Birthday", "Corporate"],
  addons: {
    Cakes: ["Chocolate Cake", "Vanilla Cake", "Red Velvet"],
    "Car Rental": ["Sedan", "SUV", "Luxury"],
    Makeup: ["Bridal", "Casual", "Glam"],
  },
  performers: ["DJ", "Live Band", "Magician"],
};

const QuotationPage = () => {
  return (
    <div className="bg-[#020628] text-white min-h-screen px-[1em] ">
      <div className=" flex py-6">
        <div className="w-[20%] font-bold mb-4 text-lg">Filter</div>
        <div className="w-[80%] text-start">Category:</div>
      </div>
      <div className="flex justify-center p-0">
        <div className="Filter w-[20%] p-4 border-r border-gray-300">
          {/* Package selection */}
          <div className="mb-6">
            <p className="font-semibold mb-2">Package (Event Type)</p>
            <select className="w-full border rounded px-2 py-1" defaultValue="">
              <option value="" disabled>
                Select Event Type
              </option>
              {filters.packages.map((pkg) => (
                <option key={pkg} value={pkg}>
                  {pkg}
                </option>
              ))}
            </select>
          </div>

          {/* Add-ons with categories & checkboxes */}
          <div className="mb-6">
            <p className="font-semibold mb-2">Add-ons</p>
            {Object.entries(filters.addons).map(([category, items]) => (
              <div key={category} className="mb-3">
                <p className="font-medium">{category}</p>
                <div className="ml-4 mt-1 flex flex-col space-y-1 max-h-40 overflow-y-auto">
                  {items.map((item) => (
                    <label
                      key={item}
                      className="inline-flex items-center space-x-2 cursor-pointer"
                    >
                      <input type="checkbox" className="form-checkbox" />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Performers with checkboxes */}
          <div>
            <p className="font-semibold mb-2">Performers</p>
            <div className="flex flex-col space-y-1 max-h-40 overflow-y-auto ml-4">
              {filters.performers.map((perf) => (
                <label
                  key={perf}
                  className="inline-flex items-center space-x-2 cursor-pointer"
                >
                  <input type="checkbox" className="form-checkbox" />
                  <span>{perf}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="border-l-[1px] h-screen border-gray-500 w-1"></div>
        <div className="panel w-[80%] flex flex-wrap gap-4 p-4">
          {sampleItems.map((item, index) => (
            <ItemCard key={index} {...item}></ItemCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuotationPage;
