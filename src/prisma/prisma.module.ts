import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // makes PrismaService available app-wide without importing each time
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
