import multer from 'multer'

const imageStorage = multer.memoryStorage()

const uploadImage = multer({ dest: '/server/images' })
