import bcrypt from 'bcryptjs'
const salt = bcrypt.genSaltSync(10)

export const hash = (password: string): string => {
  return bcrypt.hashSync(password, salt)
}

export const compare = (password : string ,hashPassword : string) => {
    return bcrypt.compare(password, hashPassword);
}

