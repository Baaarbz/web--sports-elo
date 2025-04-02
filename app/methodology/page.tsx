import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "ELO Rating Methodology - Sports ELO",
  description: "Learn how the ELO rating system is applied to different sports.",
}

export default function MethodologyPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight mb-6">ELO Rating Methodology</h1>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="lead">
            The Sports ELO system employs different calculation methods based on the type of competition. Each sport has
            its own unique characteristics that are taken into account when calculating ratings.
          </p>

          <h2>Individual 1v1 Sports (Tennis, Boxing, etc.)</h2>
          <p>Standard ELO rating system for direct competition:</p>

          <Card className="my-4">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div>{"$$R'=R+K(S-E)$$"}</div>
                <div>{"$$E=\\cfrac{Q_A}{(Q_A + Q_B)}$$"}</div>
                <div>{"$$Q = 10^{\\cfrac{R}{400}}$$"}</div>
              </div>
            </CardContent>
          </Card>

          <table className="w-full my-6">
            <thead>
              <tr>
                <th>Parameters</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{"$$Q_A$$"}</td>
                <td>{"$$Q_A$$"} for athlete</td>
              </tr>
              <tr>
                <td>{"$$Q_B$$"}</td>
                <td>{"$$Q_B$$"} for rival athlete</td>
              </tr>
              <tr>
                <td>{"$$R'$$"}</td>
                <td>New athlete rating</td>
              </tr>
              <tr>
                <td>{"$$R$$"}</td>
                <td>Old athlete rating</td>
              </tr>
              <tr>
                <td>{"$$K$$"}</td>
                <td>Multiplier used. Value {"$$K=32$$"}</td>
              </tr>
              <tr>
                <td>{"$$S$$"}</td>
                <td>Value depending on the result against the rival: Win: 1, Draw: 0.5, Lose: 0</td>
              </tr>
              <tr>
                <td>{"$$K(S-E)$$"}</td>
                <td>Rating winnings or losings for athlete</td>
              </tr>
            </tbody>
          </table>

          <h2>Team Sports (Football, Basketball, etc.)</h2>
          <p>
            Team average ELO is calculated, then applied to update individual player ratings based on match results:
          </p>

          <Card className="my-4">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div>{"$$R'=R+K(S-E)$$"}</div>
                <div>{"$$E=\\cfrac{Q_A}{(Q_A + Q_B)}$$"}</div>
                <div>{"$$Q = 10^{\\cfrac{R}{400}}$$"}</div>
              </div>
            </CardContent>
          </Card>

          <table className="w-full my-6">
            <thead>
              <tr>
                <th>Parameters</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{"$$Q_A$$"}</td>
                <td>{"$$Q_A$$"} for team</td>
              </tr>
              <tr>
                <td>{"$$Q_B$$"}</td>
                <td>{"$$Q_B$$"} for rival team</td>
              </tr>
              <tr>
                <td>{"$$R'$$"}</td>
                <td>New team rating</td>
              </tr>
              <tr>
                <td>{"$$R$$"}</td>
                <td>Old team rating</td>
              </tr>
              <tr>
                <td>{"$$K$$"}</td>
                <td>Multiplier used. Value {"$$K=32$$"}</td>
              </tr>
              <tr>
                <td>{"$$S$$"}</td>
                <td>Value depending on the result against the rival: Win: 1, Draw: 0.5, Lose: 0</td>
              </tr>
              <tr>
                <td>{"$$K(S-E)$$"}</td>
                <td>Rating winnings or losings for team (it will be applied to all the team athletes)</td>
              </tr>
            </tbody>
          </table>

          <h2>Motorsports (Formula 1, MotoGP, etc.)</h2>
          <p>System based on iRating that accounts for position finishing and field strength.</p>

          <table className="w-full my-6">
            <thead>
              <tr>
                <th>Variable</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{"$$R_{before}$$"}</td>
                <td>Driver current iRating before the race</td>
              </tr>
              <tr>
                <td>{"$$SoF$$"}</td>
                <td>Strength of Field, calculated as the average iRating of all drivers in the race</td>
              </tr>
              <tr>
                <td>{"$$Position$$"}</td>
                <td>Driver final position in the race</td>
              </tr>
              <tr>
                <td>{"$$N$$"}</td>
                <td>Number of drivers in the race</td>
              </tr>
            </tbody>
          </table>

          <h3>Calculate Expected Finish Probability</h3>
          <p>
            <em>Driver Expected Performance</em> against the {"$$SoF$$"} can be modeled with a probability using the
            logistic formula:
          </p>

          <Card className="my-4">
            <CardContent className="pt-6">
              <div className="text-center">
                <div>{"$$E=\\cfrac{1}{1 + 10^{\\cfrac{SoF - R_{before}}{400}}}$$"}</div>
              </div>
            </CardContent>
          </Card>

          <p>
            {"$$E$$"} represents driver expected performance or "win" probability against the field based on his elo
            relative to the {"$$SoF$$"}.
          </p>

          <h3>Determine the Scaling Factor (K-Factor)</h3>
          <p>
            This factor influences how much driver's elo can change in a single race. For motorsports, a typical
            K-factor might be set between 30 and 100, depending on field size and competition level. Let's define a
            scalable K-factor based on the field size:
          </p>

          <Card className="my-4">
            <CardContent className="pt-6">
              <div className="text-center">
                <div>{"$$K=30+\\cfrac{70}{N}$$"}</div>
              </div>
            </CardContent>
          </Card>

          <h3>Calculate Actual vs. Expected Performance</h3>
          <p>Define an Actual Performance Score (S) based on your position:</p>

          <Card className="my-4">
            <CardContent className="pt-6">
              <div className="text-center">
                <div>{"$$S=1-\\cfrac{Position-1}{N-1}$$"}</div>
              </div>
            </CardContent>
          </Card>

          <p>
            This way, the winner gets S=1, and the last-place finisher gets S=0, with values in between for other
            positions.
          </p>

          <h3>Calculate Elo Change</h3>
          <p>Finally, use the Elo-based adjustment for the elo change:</p>

          <Card className="my-4">
            <CardContent className="pt-6">
              <div className="text-center">
                <div>{"$$\\Delta R=K*(S-E)$$"}</div>
              </div>
            </CardContent>
          </Card>

          <p>This ΔR is your iRating gain (positive) or loss (negative).</p>

          <h3>Update Elo</h3>
          <p>New elo:</p>

          <Card className="my-4">
            <CardContent className="pt-6">
              <div className="text-center">
                <div>{"$$R_{after}=R_{before}+\\Delta R$$"}</div>
              </div>
            </CardContent>
          </Card>

          <h3>Example Calculation</h3>
          <p>Let's say:</p>

          <ol>
            <li>
              Driver initial Elo {"$$R_{before}$$"} is 1500. The race {"$$SoF$$"} is 1600. Driver finish in 5th place
              out of 20 drivers.
            </li>
            <li>
              Expected Finish Probability:
              {"$$E=\\cfrac{1}{1+10^{\\cfrac{(1600-1500)}{400}}}=\\cfrac{1}{1+10^{\\cfrac{100}{400}}} \\approx 0.36$$"}
            </li>
            <li>
              Scaling Factor (K-Factor):
              {"$$K=30+\\cfrac{70}{20}=30+3.5=33.5$$"}
            </li>
            <li>
              Actual Performance Score (S):
              {"$$S=1-\\cfrac{5-1}{20-1}=1-\\cfrac{4}{19} \\approx 0.79$$"}
            </li>
            <li>
              Calculate Elo Change:
              {"$$\\Delta R=33.5 \\times (0.79-0.36)=33.5 \\times 0.43 \\approx 14.4$$"}
            </li>
            <li>
              Updated Elo:
              {"$$R_{after}=1500+14.4=1514.4$$"}
            </li>
          </ol>

          <p>
            This approximation captures the essence of elo adjustments in iRacing. The parameters (such as K-factor) can
            be further tuned to match observed iRacing behavior more closely.
          </p>
        </div>
      </div>
    </div>
  )
}

