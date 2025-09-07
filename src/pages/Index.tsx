import { useState } from "react";
import { PackageCard } from "@/components/PackageCard";
import { PhoneModal } from "@/components/PhoneModal";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { SuccessAlert } from "@/components/SuccessAlert";
import { Wifi, Signal, Lock } from "lucide-react"; // Add Lock icon import
import { FaTiktok } from "react-icons/fa"; // TikTok icon

// Types
interface Package {
  id: string;
  duration: string;
  price: number;
  isPopular?: boolean;
}

// Packages config (could be moved to constants/packages.ts)
const packages: Package[] = [
  { id: "1", duration: "1 Hour", price: 10 },
  { id: "2", duration: "2 Hours", price: 15, isPopular: true },
  { id: "3", duration: "6 Hours", price: 45 },
  { id: "4", duration: "24 Hours", price: 150 },
];

// Possible app statuses
type Status = "idle" | "selecting" | "processing" | "success";

const Index = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [selectedPackage, setSelectedPackage] = useState<Package>();

  // Handle selecting a package
  const handlePackageSelect = (pkg: Package) => {
    setSelectedPackage(pkg);
    setStatus("selecting");
  };

  // Handle payment
  const handlePayment = async (phoneNumber: string) => {
    setStatus("processing");

    // Simulate payment API call
    setTimeout(() => {
      setStatus("success");
    }, 3000);
  };

  // Reset after success
  const handleSuccessClose = () => {
    setStatus("idle");
    setSelectedPackage(undefined);
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="bg-card border-b border-border shadow-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-wifi-gradient rounded-full p-3">
                  <Wifi className="h-8 w-8 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    WiFi Portal
                  </h1>
                  <p className="text-muted-foreground">
                    High-speed internet access
                  </p>
                </div>
              </div>

              {/* Admin Button */}
              <a
                href="/admin"
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm font-medium"
              >
                Admin Panel
              </a>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-semibold shadow-lg animate-pulse">
              <FaTiktok className="h-5 w-5" />
              Enjoy <span className="font-bold">Free TikTok Browsing</span> with
              KERONIKS WIRELESS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Choose Your
              <span className="bg-wifi-gradient bg-clip-text text-transparent">
                {" "}
                WiFi Plan
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get instant access to high-speed internet. Select a plan that suits
              your needs and start browsing immediately.
            </p>
          </div>

          {/* Package Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {packages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                duration={pkg.duration}
                price={pkg.price}
                isPopular={pkg.isPopular}
                onSelect={() => handlePackageSelect(pkg)}
              />
            ))}
          </div>

          {/* Features */}
          <div className="mt-16 text-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Secured Connections */}
              <div className="flex flex-col items-center justify-center bg-card rounded-lg p-6 shadow">
                <Lock className="h-8 w-8 text-primary mb-2" /> {/* Padlock icon */}
                <h3 className="font-semibold text-lg mb-1">Secured Connections</h3>
                <p className="text-muted-foreground text-sm">
                  All WiFi connections and payments are encrypted and secured for your safety.
                </p>
              </div>
              {/* Improved Signal */}
              <div className="flex flex-col items-center justify-center bg-card rounded-lg p-6 shadow">
                <Wifi className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold text-lg mb-1">Improved Signal</h3>
                <p className="text-muted-foreground text-sm">
                  Experience strong and reliable WiFi coverage wherever you are on our network.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modals and Overlays */}
      <PhoneModal
        isOpen={status === "selecting"}
        onClose={() => setStatus("idle")}
        onPayment={handlePayment}
        selectedPackage={selectedPackage}
        isLoading={status === "processing"}
      />

      {status === "processing" && <LoadingSpinner />}

      <SuccessAlert
        isVisible={status === "success"}
        onClose={handleSuccessClose}
        package={selectedPackage}
      />
    </>
  );
};

export default Index;
