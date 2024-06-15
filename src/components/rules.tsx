import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function GameRules() {
  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8 h-full flex-grow flex items-center bg-black-400 w-full justify-center">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Wait, how does this work again?</CardTitle>
            <CardDescription>{`here's the deets <3`}</CardDescription>
          </CardHeader>
          <CardContent>
            {/* <Button className="w-full" size="sm">
      Join Room
    </Button> */}
            <ul className="space-y-4 mx-4">
              <li>
                <h4 className="bg-bright_plum-800 w-fit p-0.5 rounded-lg px-1">
                  &#128640; Start the Vote:
                </h4>
                <p className="text-sm">
                  The room owner hits the big &quot;start vote&quot; button.
                  It's go time!
                </p>
              </li>
              <li>
                <h4 className="bg-strawberry_milkshake-800 w-fit p-0.5 rounded-lg px-1">
                  &#127922; Random Voting Order:
                </h4>
                <p className="text-sm">
                  Who votes first? Let the randomizer decide. No favoritism
                  here!
                </p>
              </li>
              <li>
                <h4 className="bg-bright_plum-800 w-fit p-0.5 rounded-lg px-1">
                  🍽️ Choose Your Fave:
                </h4>
                <p className="text-sm">
                  Each participant picks their preferred restaurant from the
                  list. Choose wisely!
                </p>
              </li>
              <li>
                <h4 className="bg-strawberry_milkshake-800 w-fit p-0.5 rounded-lg px-1">
                  &#128077;&#128078; Final Vote:
                </h4>
                <p className="text-sm">
                  Vote &quot;yes&quot; or &quot;no&quot; on each restaurant
                  choice. Democracy at its finest!
                </p>
              </li>
              <li>
                <h4 className="bg-citrus_blush-800 w-fit p-0.5 rounded-lg px-1">
                  🎉 Winner Announced:
                </h4>
                <p className="text-sm">
                  The restaurant with the most "yes" votes wins. Tie? We'll spin
                  a wheel to decide the lucky spot!
                </p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
