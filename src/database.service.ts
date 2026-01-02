import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(@InjectConnection() private readonly connection: Connection) {}

  async onModuleInit() {
    this.connection.on('connected', () => {
      this.logger.log('MongoDB connected ✅');
    });

    this.connection.on('error', (err) => {
      this.logger.error('MongoDB connection error:', err);
    });

    this.connection.on('disconnected', () => {
      this.logger.warn('MongoDB disconnected ⚠️');
    });

    // Optional: initial connection success
    if (this.connection.readyState === 1) {
      this.logger.log('MongoDB already connected (from previous state) ✅');
    }
  }

  async onModuleDestroy() {
    await this.connection.close();
    this.logger.log('MongoDB connection closed gracefully');
  }
}
