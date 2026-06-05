const styles = {
  boxWidth: "w-full max-w-7xl mx-auto",

  title: `
    text-[48px]
    sm:text-[55px]
    md:text-[68px]
    lg:text-[90px]
    xl:text-[100px]
    font-black
    leading-[1.05]
    tracking-[-2px]
    text-white
  `,

  paragraph: `
    text-[22px]
    md:text-[28px]
    text-grey-300
    leading-[2]
    font-normal
  `,

  paragraph2: `
    text-[14px]
    lg:text-[22px]
    leading-[30px]
    lg:leading-[45px]
  `,

  flexCenter: "flex justify-center items-center",
  flexStart: "flex justify-start items-start",

  paddingX: "px-5 md:px-8 lg:px-10",
  paddingY: "py-10 md:py-12 lg:py-16",
  padding: "px-5 md:px-8 lg:px-10 py-10 lg:py-16",

  marginX: "mx-5 md:mx-8 lg:mx-10",
  marginY: "my-5 md:my-8 lg:my-10",
};



export const layout = {
  sectionRow: `
    flex
    flex-col
    lg:flex-row
    items-center
    justify-between
    gap-12
  `,

  sectionColumn: `
    flex
    flex-col
    gap-12
  `,

  sectionReverse: `
    flex
    flex-col
    lg:flex-row-reverse
    items-center
    justify-between
    gap-12
  `,

  sectionInfo: `
    flex-1
    flex
    flex-col
    items-center lg:items-start
  `,

  sectionImg: `
    flex-1
    flex
    justify-center
    items-center
    relative
    mr-12
  `,

  sectionImgReverse: `
    flex-1
    flex
    justify-center
    items-center
    relative
  `,
};

export default styles;