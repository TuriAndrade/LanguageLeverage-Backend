export default function buildCreateFakeArticle({ randomNumber, randomString }) {
  return function createFakeArticle(overrides) {
    const fakeArticle = {
      title: randomString.generate(50),
      cover: randomString.generate(4) + "/" + randomString.generate(10),
      editorId: randomNumber.int(1, 100),
      isPublished: false,
      isAdmissionArticle: false,
      date: Date.now(),
      withNoEditorId: false,
      html: `<p>${randomString.generate(200)}</p>`,
      delta: {
        ops: [{ img: randomString.generate(10) }],
      },
    };

    return {
      ...fakeArticle,
      ...overrides,
    };
  };
}
