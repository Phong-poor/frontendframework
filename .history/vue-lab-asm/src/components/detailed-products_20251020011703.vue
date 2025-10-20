relatedProducts.value = relatedResponse.data
  .filter(item => item.id != products.value.id)
  .map(item => ({
    ...item,
    comments: item.comments || []
  }))