
import iconIA from "$lib/assets/icons/ia.png";
import iconBC from "$lib/assets/icons/bc.png";
import iconYT from "$lib/assets/icons/yt.png";
import iconExt from "$lib/assets/icons/ext.png";

export type Release = {
    id: string,
    ia_id: string,
    title: string,
    artist: string,
    artist_sort?: string,
    date: number,
    cover?: string,
    description?: string,
    category: string,
    links?: Array<Link>,
    samples?: Array<Sample>,
    merch?: Array<Merch>
};

export type Link = {
    link: string,
    site: string,
    description?: string,
};

export type Sample = {
    tracks: string | number,
    link?: string,
    name?: string,
    notes?: string
};

export type Merch = {
    link: string,
    image: string,
    description: string,
    quantity?: number
};

export type ChangelogEntry = {
    version: string,
    date: string,
    changes: Array<string>
};

export type Category = {
    key: string,
    reverse?: boolean
}


const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
export function dateToString(date: number): string {
    let str = months[Math.floor((date % 10000) / 100) - 1] + " ";
    const t1 = Math.floor(date / 10000), t2 = date % 100;
    str += t2.toString() + ", " + t1.toString();
    return str;
}


export function archiveLinkMP3(release: Release): string {
    if (release.ia_id.includes("/")) {
        return "https://archive.org/download/" + release.ia_id + ".mp3";
    } else {
        return "https://archive.oth/compress/" + release.ia_id + "/formats=JPEG,GIF,PNG,TXT,VBR%20MP3";
    }
}
export function archiveLinkFlac(release: Release): string {
    if (release.ia_id.includes("/")) {
        return "https://archive.org/download/" + release.ia_id + ".flac";
    } else {
        return "https://archive.oth/compress/" + release.ia_id + "/formats=JPEG,GIF,PNG,TXT,FLAC,24BIT%20FLAC";
    }
}

export function linkIcon(link: Link): string {
    return (link.site == "bc") ? iconBC : (link.site == "yt") ? iconYT : (link.site == "ia") ? iconIA : iconExt;
}
export function descriptionOrDefault(link: Link): string {
    if (link.description) return link.description;
    if (link.site == "bc") return "Bandcamp";
    if (link.site == "yt") return "YouTube";
    return "";
}