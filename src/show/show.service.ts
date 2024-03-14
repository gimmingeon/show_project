import _ from 'lodash';
import { parse } from 'papaparse';
import { Like, Repository } from 'typeorm';

import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { ShowDto } from './dto/show.dto';
import { Show } from './entities/show.entity';

@Injectable()
export class ShowService {
    constructor(
        @InjectRepository(Show)
        private readonly showRepository: Repository<Show>,
    ) { }

    async findAll(): Promise<Show[]> {
        return await this.showRepository.find({
            select: ["id", "name", "category", "imageUrl"],
        });
    }

    async findOne(id: number) {
        return await this.verifyShowById(id);
    }
    private async verifyShowById(id: number) {
        const show = await this.showRepository.findOneBy({ id });
        if (_.isNil(show)) {
            throw new NotFoundException("존재하지 않는 공연입니다");
        }

        return show;
    }
   
    async create(showDto: ShowDto) {
        const { name, description, dateAndTime, place, imageUrl, category } = showDto;
        const show = await this.showRepository.save({
            name, description, dateAndTime, place, imageUrl, category});

        return show;
    }

    async showSearch(search: string) {
        return await this.showRepository.find({
            where: { name: Like(`%${search}%`) },
            select: ["id", "name", "description", "dateAndTime", "category"]
        });
    }
}