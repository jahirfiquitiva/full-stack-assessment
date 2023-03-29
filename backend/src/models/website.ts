import { model, Schema } from 'mongoose';
import type { Model } from 'mongoose';
import validator from 'validator';
import { Website } from 'types';

const LinkSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  url: {
    type: String,
    required: true,
    trim: true,
    unique: false,
  },
});

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
    unique: true,
    validate: [validator.isURL],
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      default: [],
    },
  ],
  links: [LinkSchema],
  linksCount: {
    type: Number,
    default: 0,
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
