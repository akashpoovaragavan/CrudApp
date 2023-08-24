export const crudApi = slug => {
  console.log(
    'check endppoint',
    `/api/3f1f1f7f415e48b7a91d10659cbab99b/user/${slug?.id ? slug?.id : ''}`,
  );

  return `/api/2885ad99fe89422ab32f0a23222da570/user/${
    slug?.id ? slug?.id : ''
  }`;
};
