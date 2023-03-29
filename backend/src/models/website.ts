import { model, Schema } from 'mongoose';
import type { Model } from 'mongoose';
import validator from 'validator';
import { Website } from 'types';

const WebsiteSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    required: true,
    trim: true,
    validate: [validator.isURL],
  },
});

WebsiteSchema.methods.toJSON = function (): string {
  const { _id, ...website } = this.toObject();
  website.id = _id;
  delete website.__v;
  return website;
};

export const WebsiteModel: Model<Website> = model<Website>(
  'website',
  WebsiteSchema,
);
