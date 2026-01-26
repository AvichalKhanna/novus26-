// sponsorsData.js

import dojo from "../../assets/sponsors/dojoworks.jpeg"
import launched from "../../assets/sponsors/launchedglobal.jpeg"
import balaji from "../../assets/sponsors/balajiwafers.jpeg"
import davat from "../../assets/sponsors/davatbeverages.jpeg"
import crossroads from "../../assets/sponsors/crossroadscafe.jpeg"
import sundarone from "../../assets/sponsors/sundaronehostel.png"
import greensole from "../../assets/sponsors/greensale.jpeg"
import bloom from "../../assets/sponsors/bloom.jpeg"
import devfolio from "../../assets/sponsors/devfolio.jpeg"
import unstop from "../../assets/sponsors/unstop.jpeg"
import interviewcake from "../../assets/sponsors/interviewcake.jpeg"

export const sponsors = [
  { name: "DojoWorks", role: "Title Sponsor", image: dojo, tier: "title" },
  { name: "LaunchED Global", role: "Powered Sponsor", image: launched, tier: "powered" },
  { name: "Balaji Wafers", role: "Snacking Partner", image: balaji },
  { name: "Davat Beverages", role: "Beverage Sponsor", image: davat },
  { name: "Crossroads Café", role: "Gift Partner", image: crossroads },
  { name: "Sundarone Hostels", role: "Promotional Partner", image: sundarone },
  { name: "GreenSole", role: "Lifestyle Partner", image: greensole },
  { name: "Bloom Hotels", role: "Travel & Accommodation Partner", image: bloom },
  { name: "Devfolio", role: "Knowledge Partner", image: devfolio },
  { name: "Unstop", role: "Platform Partner", image: unstop },
  { name: "Interview Cake", role: "Skill Enhancement Partner", image: interviewcake },
]

const row1 = sponsors.filter((_, i) => i % 2 === 0)
const row2 = sponsors.filter((_, i) => i % 2 !== 0)

export default function SponsorsMarquee() {
  return (
    <div className="relative w-full max-w-6xl overflow-hidden mt-6 space-y-6 h-20 md:h-35">

      <div className="md:hidden overflow-hidden">
        <div className="marquee-track flex gap-20">
          {[...sponsors].map((s, i) => (
            <div
              key={i}
              className="flex items-center min-w-max"
            >
              <div className="10xl:block">
                <p className="text-sm font-semibold text-cyan-400/80">
                  {s.name}
                </p>
                <p className="text-xs text-gray-500">
                  {s.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ROW 1 */}
      <div className="hidden md:block overflow-hidden">
        <div className="marquee-track flex gap-20">
          {[...row1, ...row1].map((s, i) => (
            <div
              key={i}
              className="flex items-center min-w-max"
            >
              <div className="10xl:block">
                <p className="text-sm font-semibold text-cyan-400/80">
                  {s.name}
                </p>
                <p className="text-xs text-gray-500">
                  {s.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ROW 2 */}
      <div className="hidden md:block overflow-hidden">
        <div className="marquee-track-reverse flex gap-20">
          {[...row2, ...row2].map((s, i) => (
            <div
              key={i}
              className="flex items-center min-w-max"
            >
              <div className="10xl:block">
                <p className="text-sm font-semibold text-cyan-300/80">
                  {s.name}
                </p>
                <p className="text-xs text-gray-500">
                  {s.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
