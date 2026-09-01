import type { ChangelogEntry } from "$lib/common";


export const changelog: Array<ChangelogEntry> = [
    {
        version: "3.0",
        date: "2026.08.05",
        changes: [
            "migrated the site to typescript and svelte",
            "moved the non-default discography sort options to separate pages: <a href=\"/music/alias\">/music/alias</a>, <a href=\"/music/recent\">/music/recent</a> and <a href=\"/music/vault\">/music/vault</a>",
            "elements that slide down no longer push down everything that's below them",
            "improved mobile site",
            "fixed the bug where you couldn't download live sets from the discography page",
            "removed the \"Other\" section (maybe temporarily maybe not)",
            "other minor changes"
        ]
    },
    {
        version: "2.4.4",
        date: "2026.07.04",
        changes: [
            "fixed archive.org embeds not showing the tracklist"
        ]
    },
    {
        version: "2.4.3",
        date: "2026.07.01",
        changes: [
            "rewrote the bio & alias list on the main page",
            "fixed links on the main page"
        ]
    },
    {
        version: "2.4.2",
        date: "2025.08.30",
        changes: [
            "made the site work with individual tracks on internet archive"
        ]
    },
    {
        version: "2.4.1",
        date: "2025.08.14",
        changes: [
            "attempt to fix player embeds not showing all tracks in the playlist",
            "fix the top bar not functioning on mobile",
            "other minor fixes"
        ]
    },
    {
        version: "2.4",
        date: "2025.04.13",
        changes: [
            "stopped using iframes for navbar embedding (every page is just plain html now; no weird \"?q=\" stuff)<br>this broke a lot of urls but i can't be bothered to set up redirects",
			"removed the \"unreleased\" page as it has no use now that the patreon page exists",
			"other behind-the-scenes structural changes"
        ]
    },
    {
        version: "2.3.3",
        date: "2025.02.06",
        changes: [
            "moved covers to neocities servers"
        ]
    },
    {
        version: "2.3.2",
        date: "2023.07.19",
        changes: [
            "fixed some bugs",
            "all the covers are now stored through discord cdn",
            "converted all small cover variants to jpg so that scrolling through the release list uses way less data"
        ]
    },
    {
        version: "2.3.1",
        date: "2023.07.17",
        changes: [
            "more small structural changes",
            "rewrote the backend",
            "opening links in new tab works correctly now",
            "added custom redirects to prevent links from stopping working after a structure change (for example, <a href=\"/?q=unrel\">?q=unrel</a> and <a href=\"/?q=music/unrel\">?q=music/unrel</a> should both work despite only the latter actually existing)"
        ]
    },
    {
        version: "2.3",
        date: "2023.06.15",
        changes: [
            "added a new section",
            "changed file structure",
            "internal changes to hopefully reduce loading times / used data"
        ]
    },
    {
        version: "2.2.1",
        date: "2023.05.17",
        changes: [
            "bugfixes and slight changes"
        ]
    },
    {
        version: "2.2",
        date: "2023.05.15",
        changes: [
            "rewrote the frontend using iframes (no more piles upon piles of \"createElement\"s and \"appendChild\"s)",
            "added a section for physicals in info pages",
            "minor graphics tweaks, including ones for small screen devices (my favorite ones)"
        ]
    },
    {
        version: "2.1.1",
        date: "2023.04.22",
        changes: [
            "MORE small screen device improvements",
            "minor changes & fixes"
        ]
    },
    {
        version: "2.1",
        date: "2023.03.19",
        changes: [
            "finished filling out info / sample list for releases (for the most part)",
            "implemented a basic version of the merch page",
            "added an ability to view releases from a specific alias from the info page",
            "fixed a bug where some of the releases won't display on the alias page"
        ]
    },
    {
        version: "2.0.2b",
        date: "2023.02.24",
        changes: [
            "more smaller screen device improvements",
            "js/css code cleanup and refactoring",
            "added about me so the index page is not completely worthless",
            "reimplemented the \"unreleased material\" page, now not split in collections"
        ]
    },
    {
        version: "2.0.1b",
        date: "2023.02.17",
        changes: [
            "fixed various bugs",
            "mobile navigation actually works as intended now, although still sloppy",
            "the refreshed music page ui is now universal across all pages, with slight modifications",
            "updated the changelog with older versions based on tweets"
        ]
    },
    {
        version: "2.0.0b",
        date: "2023.02.11",
        changes: [
            "updated database",
            "cover art is now stored along with the website and no longer fetched from archive.org",
            "implemented details page for each release (incomplete)",
            "changed the navigation ui to make the site feel more busy (after not so constructive criticism from wael)",
            "attempted to make site work better on smaller screen devices"
        ]
    },
    {
        version: "1.2",
        date: "2022.08.14",
        changes: [
            "main and links pages were merged, with a redesign",
            "two new sections in the music tab (old releases & unreleased collections)"
        ]
    },
    {
        version: "1.1",
        date: "2022.03.19",
        changes: [
            "archive.org integration allowing to download all albums directly from the list",
            "prototype of links page",
            "cover art is now fetched from archive.org"
        ]
    },
    {
        version: "1.0",
        date: "2022.03.08",
        changes: [
            "ported the webflow version to neocities.org (based)",
            "simplified the process of adding releases",
            "added the \"sort by category\" (aka default) option"
        ]
    },
    {
        version: "0.2",
        date: "2022.01.11",
        changes: [
            "added the \"sort by alias\" option"
        ]
    },
    {
        version: "0.1",
        date: "2022.01.06",
        changes: [
            "hosted on webflow (yucky)",
            "first version with only chronological music view"
        ]
    }
]