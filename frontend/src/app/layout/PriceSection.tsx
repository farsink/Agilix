import { useState } from "react";
import { Check } from "lucide-react";
import "./PricingSection.css";

interface PricingTier {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  isPopular?: boolean;
  isFree?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Free Plan",
    description:
      "Perfect for beginners who want to start their fitness journey with basic features.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    isFree: true,
    features: [
      "Basic workout plans for one fitness goal (e.g., Weight Loss)",
      "Three weekly workouts",
      "Basic progress tracking",
      "Access to community forums",
    ],
  },
  {
    name: "Fit Plan",
    description:
      "Great for fitness enthusiasts who want customized plans and advanced tracking.",
    monthlyPrice: 9.99,
    yearlyPrice: 7.99,
    isPopular: true,
    features: [
      "Customized workout plans for multiple goals",
      "Five weekly workouts",
      "Advanced progress tracking with charts",
      "Nutrition tips",
    ],
  },
  {
    name: "Pro Plan",
    description:
      "Perfect for serious athletes who need professional coaching and meal planning.",
    monthlyPrice: 19.99,
    yearlyPrice: 15.99,
    features: [
      "One-on-one coach consultations monthly",
      "Unlimited workout adjustments",
      "Meal planning tools",
      "Priority support",
    ],
  },
  {
    name: "Elite Plan",
    description:
      "Ultimate plan for dedicated fitness professionals with daily coaching support.",
    monthlyPrice: 39.99,
    yearlyPrice: 31.99,
    features: [
      "Daily coach check-ins",
      "Real-time workout feedback",
      "Personalized meal plans with grocery lists",
      "Exclusive fitness challenges",
    ],
  },
];

const PricingSection: React.FC = () => {
  const [isYearly, setIsYearly] = useState<boolean>(false);

  return (
    <div className='pricing-container' id='pricing'>
      <div className='pricing-content'>
        {/* Header */}
        <div className='pricing-header'>
          <p className='pricing-label'>PRICING</p>
          <h1 className='pricing-title'>Choose Your Fitness Plan</h1>
          <p className='pricing-subtitle'>
            Start free and upgrade as you grow.
          </p>

          {/* Toggle Buttons with Glass Effect */}
          <div className='toggle-container'>
            <button
              onClick={() => setIsYearly(false)}
              className={`toggle-button ${!isYearly ? "active" : "inactive"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`toggle-button ${isYearly ? "active" : "inactive"}`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className='pricing-grid'>
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`pricing-card ${
                tier.isPopular ? "popular" : "regular"
              }`}
            >
              {tier.isPopular && <div className='popular-badge'>Best Deal</div>}

              <div className='card-header'>
                <div className='plan-name-container'>
                  <div
                    className={`plan-indicator ${
                      tier.isPopular ? "popular" : "regular"
                    }`}
                  ></div>
                  <h3
                    className={`plan-name ${
                      tier.isPopular ? "popular" : "regular"
                    }`}
                  >
                    {tier.name}
                  </h3>
                </div>
                <p
                  className={`plan-description ${
                    tier.isPopular ? "popular" : "regular"
                  }`}
                >
                  {tier.description}
                </p>
              </div>

              <div className='card-content'>
                <div className='price-container'>
                  {tier.isFree ? (
                    <span
                      className={`price-free ${
                        tier.isPopular ? "popular" : "regular"
                      }`}
                    >
                      Free
                    </span>
                  ) : (
                    <div>
                      <span
                        className={`price-paid ${
                          tier.isPopular ? "popular" : "regular"
                        }`}
                      >
                        ${isYearly ? tier.yearlyPrice : tier.monthlyPrice}
                      </span>
                      <span
                        className={`price-period ${
                          tier.isPopular ? "popular" : "regular"
                        }`}
                      >
                        /month
                      </span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className='features-list'>
                  {tier.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className='feature-item'>
                      <Check
                        className={`feature-icon ${
                          tier.isPopular ? "popular" : "regular"
                        }`}
                      />
                      <span
                        className={`feature-text ${
                          tier.isPopular ? "popular" : "regular"
                        }`}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className='action-buttons'>
                  <button
                    className={`primary-button ${
                      tier.isFree
                        ? "free"
                        : tier.isPopular
                        ? "popular"
                        : "regular"
                    }`}
                  >
                    {tier.isFree ? "Current Plan" : "Get Started"}
                  </button>
                  <button
                    className={`learn-more-button ${
                      tier.isPopular ? "popular" : "regular"
                    }`}
                  >
                    Learn more
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
