import Marquee from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

const reviews = [
  {
    name: "Aarav Gupta",
    username: "@aaravgupta",
    body: "This tool has been a game-changer for managing my daily tasks. Absolutely love it!",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=AaravG&backgroundColor=b6e3f4&skinColor=937341", // Young Indian male
  },
  {
    name: "Priya Sharma",
    username: "@priyasharma",
    body: "The intuitive design and functionality are unparalleled. Kudos to the team!",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaS&gender=female&backgroundColor=ffdfbf&skinColor=937341", // Indian woman
  },
  {
    name: "Rohan Mehta",
    username: "@rohanmehta",
    body: "I've been using this for months, and it keeps getting better. Highly recommended!",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=RohanM&backgroundColor=c0aede&skinColor=937341", // Young Indian male
  },
  {
    name: "Ananya Patel",
    username: "@ananyap",
    body: "Every detail is so well-thought-out. It's a joy to use!",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=AnanyaP&gender=female&backgroundColor=ffd5dc&skinColor=937341", // Indian woman
  },
  {
    name: "Kabir Verma",
    username: "@kabirv",
    body: "Amazing product. It has simplified my workflow so much. Great job!",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=KabirV&accessories=prescription02&backgroundColor=b6e3f4&skinColor=937341", // Middle-aged Indian male
  },
  {
    name: "Ishita Singh",
    username: "@ishitasingh",
    body: "This is by far the most effective tool I've come across. Bravo!",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=IshitaS&gender=female&backgroundColor=ffd5dc&skinColor=937341", // Young Indian woman
  },
  {
    name: "Arjun Rao",
    username: "@arjunrao",
    body: "I can't imagine working without this anymore. It's incredible.",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=ArjunR&backgroundColor=c0aede&skinColor=937341", // Indian male
  },
  {
    name: "Diya Nair",
    username: "@diyanair",
    body: "The features are so intuitive and helpful. Great work!",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=DiyaN&gender=female&backgroundColor=ffdfbf&skinColor=937341", // Indian woman
  },
  {
    name: "Vedant Kapoor",
    username: "@vedantk",
    body: "The seamless experience and detailed design are just next-level. Love it!",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=VedantK&backgroundColor=b6e3f4&skinColor=937341", // Indian male
  },
  {
    name: "Meera Jain",
    username: "@meeraj",
    body: "This product has made such a positive impact on my productivity. Amazing!",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=MeeraJ&gender=female&accessories=prescription01&backgroundColor=ffd5dc&skinColor=937341", // Middle-aged Indian woman
  },
  {
    name: "Rajesh Iyer",
    username: "@rajeshi",
    body: "I am blown away by how easy and effective this tool is. Great job!",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=RajeshI&accessories=prescription02&backgroundColor=c0aede&skinColor=937341", // Middle-aged Indian male
  },
  {
    name: "Sanya Bose",
    username: "@sanyab",
    body: "An exceptional tool for professionals! I can't recommend it enough.",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=SanyaB&gender=female&backgroundColor=ffdfbf&skinColor=937341", // Young Indian woman
  },
];
const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-50/[.1] bg-gray-950/[.01] hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background"></div>
    </div>
  );
}
