[![make.fun · news-image-20261120](https://make.fun/badge/news-image-20261120.svg)](https://make.fun/bounty/news-image-20261120?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)
[![rank](https://make.fun/badge/news-image-20261120/people871/makefun-news-image-20261120/rank.svg)](https://make.fun/bounty/news-image-20261120/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)
[![reward](https://make.fun/badge/news-image-20261120/people871/makefun-news-image-20261120/reward.svg)](https://make.fun/bounty/news-image-20261120?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)

# Friday 20 November 2026 in one image

A newspaper front page that sums up Friday 20 November 2026 in a single
1024×1024 image: 8 verified stories, a world map of where they happened, and
an explicit date check that throws out stories from the wrong day.

The front page leads with Trump pushing any Iran decision to 2027 and the
Senate voting 51–48 against curbing his Iran war powers, then covers Cyclone
Akvan's noon landfall near Gopalpur (105,304 evacuated), the ICJ's first-ever
ruling that a state committed genocide (Myanmar, against the Rohingya), GTA VI
taking $1.84bn in one day, Anthropic's record $81bn IPO closing, Seoul's top
court overturning ex-PM Han's 15-year sentence, and Europe saying it is ready
for Ukraine talks — plus World Children's Day, which falls on 20 November.
Every story is sourced (Reuters, BBC, IMD, ICJ, Sensor Tower, UN) and every
fact on the page was verified against a named source before the image was
generated.

## Run it

```sh
MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, standard library only) writes the image to
`$MAKEFUN_OUTPUT_DIR/entry.png`, checking first that it is a complete JPEG
(FFD8 start, FFD9 end, 1024×1024) and then verifying the written file is
byte-identical (length and SHA-256). Running it twice produces identical bytes.

Built for the [make.fun](https://make.fun/bounty/news-image-20261120) bounty
"Sum up 20 November's world news in one image" ($250, top 50 share the prize).
