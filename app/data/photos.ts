import type { Photo } from '~/types/photo'
import { pixivArtworks } from './pixiv-artworks.js'

// User-provided illustrations; reference numbers come from original filenames.
const localPhotos: Photo[] = [
  {"id":"114887243_p0","originalFilename":"114887243_p0.jpg","src":"/photos/114887243_p0.webp","alt":"Cure Flora in a pink dress surrounded by drifting petals","title":"Petals in the light","note":"Cure Flora · illustration","width":3209,"height":4523,"artworkNumber":"114887243"},
  {"id":"115188495_p0_master1200","originalFilename":"115188495_p0_master1200.jpg","src":"/photos/115188495_p0_master1200.webp","alt":"Colorful illustration of Cure Flora with flowers and flowing ribbons","title":"A garden of color","note":"Cure Flora · illustration","width":920,"height":1200,"artworkNumber":"115188495"},
  {"id":"52286572_p0_master1200","originalFilename":"52286572_p0_master1200.jpg","src":"/photos/52286572_p0_master1200.webp","alt":"Cure Flora in a white and pink gown with golden hair","title":"A golden greeting","note":"Cure Flora · illustration","width":600,"height":800,"artworkNumber":"52286572"},
  {"id":"53568697_p0","originalFilename":"53568697_p0.png","src":"/photos/53568697_p0.webp","alt":"Cure Flora floating above a glowing pink flower against a dark background","title":"Bloom in the dark","note":"Cure Flora · illustration","width":990,"height":660,"artworkNumber":"53568697"},
  {"id":"54679996_p0","originalFilename":"54679996_p0.jpg","src":"/photos/54679996_p0.webp","alt":"Orange-haired girl smiling among green leaves and pink flowers","title":"A little spring joy","note":"Cure Flora · illustration","width":1000,"height":1000,"artworkNumber":"54679996"},
  {"id":"54747876_p0","originalFilename":"54747876_p0.jpg","src":"/photos/54747876_p0.webp","alt":"Close-up of Cure Flora with long golden hair flowing across a white background","title":"Hair like sunlight","note":"Cure Flora · illustration","width":999,"height":832,"artworkNumber":"54747876"},
  {"id":"56322653_p0","originalFilename":"56322653_p0.png","src":"/photos/56322653_p0.webp","alt":"Cure Flora in an ornate pink floral dress surrounded by flowers","title":"A crown of flowers","note":"Cure Flora · illustration","width":1137,"height":1588,"artworkNumber":"56322653"},
  {"id":"59211450_p0","originalFilename":"59211450_p0.png","src":"/photos/59211450_p0.webp","alt":"Cure Flora framed by a bright multicolored bouquet","title":"Bouquet of dreams","note":"Cure Flora · illustration","width":1109,"height":1564,"artworkNumber":"59211450"},
  {"id":"63911813_p0_master1200","originalFilename":"63911813_p0_master1200.jpg","src":"/photos/63911813_p0_master1200.webp","alt":"Cure Flora in a richly decorated pink palace with floral ornaments","title":"A palace in bloom","note":"Cure Flora · illustration","width":1200,"height":1069,"artworkNumber":"63911813"},
  {"id":"72253882_p0","originalFilename":"72253882_p0.jpg","src":"/photos/72253882_p0.webp","alt":"Cure Flora floating above pale blue flowers with flowing golden hair","title":"Dancing on air","note":"Cure Flora · illustration","width":1100,"height":778,"artworkNumber":"72253882"},
  {"id":"79659010_p0","originalFilename":"79659010_p0.png","src":"/photos/79659010_p0.webp","alt":"Cure Flora in a layered pink dress with long flowing golden hair","title":"Blossom, softly","note":"Cure Flora · illustration","width":2900,"height":4096,"artworkNumber":"79659010"},
  {"id":"81377704_p0_master1200","originalFilename":"81377704_p0_master1200.jpg","src":"/photos/81377704_p0_master1200.webp","alt":"Cure Flora with closed eyes holding her hands together among flowers","title":"A quiet wish","note":"Cure Flora · illustration","width":638,"height":1200,"artworkNumber":"81377704"},
  {"id":"83807685_p0_master1200","originalFilename":"83807685_p0_master1200.jpg","src":"/photos/83807685_p0_master1200.webp","alt":"Cure Flora surrounded by pale pink ribbons and geometric shapes","title":"Ribbons of pink","note":"Cure Flora · illustration","width":811,"height":1200,"artworkNumber":"83807685"},
  {"id":"93006787_p0","originalFilename":"93006787_p0.jpg","src":"/photos/93006787_p0.webp","alt":"Small stylized Cure Flora holding a pink flower wand","title":"A small wonder","note":"Cure Flora · illustration","width":595,"height":842,"artworkNumber":"93006787"},
  {"id":"96609083_p0","originalFilename":"96609083_p0.jpg","src":"/photos/96609083_p0.webp","alt":"Cure Flora with golden hair against pink moonlight and dark vines","title":"Moonlit petals","note":"Cure Flora · illustration","width":4671,"height":3305,"artworkNumber":"96609083"},
  {"id":"98125694_p0","originalFilename":"98125694_p0.png","src":"/photos/98125694_p0.webp","alt":"Cure Flora reclining amid flowing pink ribbons and petals","title":"Floating into spring","note":"Cure Flora · illustration","width":4096,"height":2304,"artworkNumber":"98125694"},
  {"id":"GmWmxRua8AAmebf","originalFilename":"GmWmxRua8AAmebf.jfif","src":"/photos/GmWmxRua8AAmebf.webp","alt":"Black and white floral line illustration of Cure Flora with pink accents","title":"Lines and roses","note":"Cure Flora · illustration","width":2048,"height":1810},
]

export const photos: Photo[] = localPhotos.map(photo => {
  const artwork = photo.artworkNumber ? pixivArtworks[photo.artworkNumber] : undefined
  return artwork ? { ...photo, title: artwork.title, note: artwork.subtitle, artist: artwork.artist, sourceUrl: artwork.url } : photo
})

export const heroPhoto: Photo = photos[5]!
