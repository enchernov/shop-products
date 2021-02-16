export const delAvatar = async (deleteFile, fileId) => {
  try {
    const { data } = await deleteFile({
      variables: {
        input: {
          where: { id: fileId },
        },
      },
    })
    if (data.deleteFile?.file) {
      return data.deleteFile
    }
    return data.errors[0]
  } catch (error) {
    return error
  }
}
