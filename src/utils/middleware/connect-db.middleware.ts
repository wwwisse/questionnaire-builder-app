import mongoose from 'mongoose';

import { EnvEnum } from '@/env/env.enum';
import EnvService from '@/env/env.service';

export const connectDb = async () =>
 mongoose.connect(EnvService.get(EnvEnum.DB_URL));
