import bcrypt from 'bcrypt'

export const hashPassword = async (password) => {
  try {
    const saltRound = 10
    const hashPassword = await bcrypt.hash(password, saltRound)
    return hashPassword
  } catch (error) {
    console.log(error)
  }
}

export const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword)
  } catch (error) {
    console.log(error)
  }
}
