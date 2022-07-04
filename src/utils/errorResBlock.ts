const buildErrorResponseRes = (res) => {
  return res.json( {
    "status": {
      "code": 400,
      "header": "Unable to proceed",
      "description": "Bad Request",
      "moreInfo": null
  },
  "data": null
  });  
} 
export { buildErrorResponseRes }