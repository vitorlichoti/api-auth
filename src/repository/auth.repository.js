const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

class AuthRepository {
  async register(username, password, name, email, avatar_url) {

    const user = await prisma.user.create({
      data: {
        username,
        password,
        name,
        email,
        avatar_url
      }
    })
    return user;

  }

  async login(username, password) {
    console.log(username, password);
    const user = await prisma.user.findFirst({
      where: {
        username,
        password
      }
    })

    return user;
  }

  async getUserByUsername(username) {
    const user = await prisma.user.findFirst({
      where: {
        username
      }
    })

    return user;
  }
}

module.exports = AuthRepository;