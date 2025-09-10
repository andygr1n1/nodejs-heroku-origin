import type fileUpload from 'express-fileupload'
import type { UploadedFile } from 'express-fileupload'
export type IFileData = {
    id: string
    path: string
    file: UploadedFile
}

export const getFilesData = ({
    files,
    requestBody,
}: {
    files?: fileUpload.FileArray | null
    requestBody?: Record<string, string>
}) => {
    const filesData: IFileData[] = []

    if (!files) {
        return filesData
    }

    if (files.binary) {
        const binaryFiles = Array.isArray(files.binary) ? files.binary : [files.binary]
        for (const file of binaryFiles) {
            const path = requestBody?.[file.name]
            filesData.push({
                id: file.name,
                path: path || file.name,
                file: file,
            })
        }
    } else if (Array.isArray(files)) {
        for (const file of files) {
            filesData.push({
                id: file.name,
                path: file.name,
                file: file,
            })
        }
    }

    return filesData
}
