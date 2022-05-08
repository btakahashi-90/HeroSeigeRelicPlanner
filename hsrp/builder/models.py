from django.db import models

# Create your models here.

# What components make up a "Relic Build" in Hero Seige?
# A "Holder" for the relics, this will be the "Hero" but we don't really care about its stats, it's just a container
# - THIS IS BECAUSE THIS IS A SIMPLE APPLICATION, A more complex version may take into account base stats and min/maxing.
# -- This is not the application to use to do that unless you wish to put in the extra work
# - The "Hero" should only be able to hold the game's current max relics (30? at the time of writting this)

# The Relics - most relics are unique, and are all unique in name.
# Things Relics ALWAYS Have
# - Name
# - Description
# Things Relics CAN have
# - Stat increases: Attack Speed (AS), Strength, Energy, Stamina, Armor
# -- Stat increases are all in PERCENTS in the game, and should be displayed as % but don't need to be stored as %.
# - Passive effect - non-stat increase
# - Active effect - will include "stat increases" as simple text, NOT CALCULATED

# Total Stat increases
# - This doesn't HAVE to be stored anywhere, it can be dynamically calculated on "view load"
# -- The "problem" with not storing it is you can't sort or "preview" builds without a lot of calculations being re-executed on page loads
# -- The alternative then is to have more DB Queries and Storage Space, which is probably faster than re-calc but more expensive in storage
# -- So that'll be a personal decision, since I personally don't plan on keeping TONS of builds and this is more for personal use, I'll just recalc everything
# --- Plus recalc will be good practice for loop optimizations (kind of...it's a simple for loop if I'm guessing right)
# --- You know what, it'll be good to practice AJAX and use JS to calculate it, f-it.

# So how do things relate:
# A "Hero" or "Build" will contain - multiple Relics (many-to-many?), current relic count (int - may remove...not really...important...), name (string - because we should but it's not necessary)
# A "Relic" will contain - Name (string), Description (string), passive_non_stat (string), active_effect (string), is_active_relic (bool, for filtering), icon (string)
# A "Stat increase" will contain - AS %, STR %, EN %, ST %, ARM %, Relic (Foreign Key)
# An Icon - No...global storage...so not entirely sure how this is going to work yet. Might just need to upload the files to Static.
# - Yeah, icons should be stored in Static, not external string refs...that'd be...weird.