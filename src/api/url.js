export const crudApi = slug => {
  // console.log(
  //   'check endppoint',
  //   `/api/04b7f6869a944f4684352d101b23ec8d/user/${slug?.id ? slug?.id : ''}`,
  // );

  return `/api/04b7f6869a944f4684352d101b23ec8d/user/${
    slug?.id ? slug?.id : ''
  }`;
};
