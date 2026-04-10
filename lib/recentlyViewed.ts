

export const addRecentlyViewed = (product: unknown) => { 
  if (!product) return; 

  let viewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');

  // removing duplicates
  viewed = viewed.filter((p: unknown) => p.id !== product.id);

  // add current product to the beginning
  viewed.unshift(product);

  // 6 items max
  if (viewed.length > 6) viewed = viewed.slice(0, 6);

  localStorage.setItem('recentlyViewed', JSON.stringify(viewed));
}

export const getRecentlyViewed = () => {
  return JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
}