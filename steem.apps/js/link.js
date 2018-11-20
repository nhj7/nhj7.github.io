const urlChar = '[^\\s"<>\\]\\[\\(\\)]';
const urlCharEnd = urlChar.replace(/\]$/, ".,']"); // insert bad chars to end on
const imagePath =
    '(?:(?:\\.(?:tiff?|jpe?g|gif|png|svg|ico)|ipfs/[a-z\\d]{40,}))';
const domainPath = '(?:[-a-zA-Z0-9\\._]*[-a-zA-Z0-9])';
const urlChars = '(?:' + urlChar + '*' + urlCharEnd + ')?';

const urlSet = ({ domain = domainPath, path } = {}) => {
    // urlChars is everything but html or markdown stop chars
    return `https?:\/\/${domain}(?::\\d{2,5})?(?:[/\\?#]${urlChars}${
        path ? path : ''
    })${path ? '' : '?'}`;
};

const any = (flags = 'i') => new RegExp(urlSet(), flags);
const local = (flags = 'i') =>
    new RegExp(
        urlSet({ domain: '(?:localhost|(?:.*\\.)?steemit.com)' }),
        flags
    );
const remote = (flags = 'i') =>
        new RegExp(
            urlSet({ domain: `(?!localhost|(?:.*\\.)?steemit.com)${domainPath}` }),
            flags
        );
const youTube = (flags = 'i') => new RegExp(urlSet({ domain: '(?:(?:.*.)?youtube.com|youtu.be)' }), flags);
const image = (flags = 'i') => new RegExp(urlSet({ path: imagePath }), flags);
const imageFile = (flags = 'i') => new RegExp(imagePath, flags);
const youTubeId = /(?:(?:youtube.com\/watch\?v=)|(?:youtu.be\/)|(?:youtube.com\/embed\/))([A-Za-z0-9\_\-]+)/gi;
const vimeo = /https?:\/\/(?:vimeo.com\/|player.vimeo.com\/video\/)([0-9]+)\/*/
const vimeoId = /(?:vimeo.com\/|player.vimeo.com\/video\/)([0-9]+)/;
const ipfsPrefix = /(https?:\/\/.*)?\/ipfs/i;

console.log(local);
