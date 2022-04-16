import path from 'path';
import Email from 'email-templates';
import { Injectable } from '@nestjs/common';

/**
 * Utility class for sending emails
 */
@Injectable()
export class Mail {
  private _to: string;
  private _from?: string;
  private _subject?: string;
  private _template: string;
  private _args: Record<string, string>;

  public constructor() {
    this._args = {};
    this._from = process.env.MAIL_FROM;
  }

  /**
   * Sets the recipient address for this email.
   *
   * @param {string} to
   * @returns {Mail}
   */
  public to(to: string): Mail {
    this._to = to;
    return this;
  }

  /**
   * Sets the sender address for this email.
   *
   * @param {string} from
   * @returns {Mail}
   */
  public from(from: string): Mail {
    this._from = from;
    return this;
  }

  /**
   * Sets any arguments needed for the template for this email
   *
   * @param {Record<string, any>} args
   * @returns {Mail}
   */
  public with(args: Record<string, any>): Mail {
    this._args = {
      ...this._args,
      ...args,
    };
    return this;
  }

  /**
   * Sets the subject for this email
   *
   * @param {string} subject
   * @returns {Mail}
   */
  public subject(subject: string): Mail {
    this._subject = subject;
    return this;
  }

  /**
   * Sets the template for this email
   *
   * @param {string} template
   * @returns {Mail}
   */
  public template(template: string): Mail {
    this._template = template;
    return this;
  }

  /**
   * Attempts to send the email
   */
  public async send() {
    const email = new Email({
      transport: this._getTransport(),
      send: true,
    });
    await email.send({
      template: path.resolve(__dirname, `../emails/${this._template}`),
      message: {
        to: this._to,
        from: this._from,
        subject: this._subject,
      },
      locals: {
        ...this._args,
      },
    });
  }

  /**
   * Creates the mailing transport
   *
   * @returns {Transport}
   */
  private _getTransport() {
    switch (process.env.MAIL_METHOD?.toLowerCase()) {
      case 'mailtrap':
        return {
          host: 'smtp.mailtrap.io',
          port: 2525,
          auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASS,
          },
        };
      case 'ses':
        return {
          host: 'email-smtp.eu-west-2.amazonaws.com',
          port: 465,
          auth: {
            user: process.env.SES_USER,
            pass: process.env.SES_PASS,
          },
        };
      default:
        throw new Error('Mailing method not configured.');
    }
  }
}
