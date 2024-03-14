import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/user/types/userRole.type';

import {
    Body, Controller, Get, Param, Post, Query, UseGuards
} from '@nestjs/common';

import { ShowDto } from './dto/show.dto';
import { ShowService } from './show.service';

// @UseGuards(RolesGuard)
@Controller('show')
export class ShowController {
    constructor(private readonly showService: ShowService) { }

    // 공연 검색
    @Get("search")
    async search(@Query("search") search: string) {
        return await this.showService.showSearch(search);
    }


    // 공연 목록 조회
    @Get("check")
    async findAll() {
        return await this.showService.findAll();
    }

    // 공연 상세보기
    @Get(":id")
    async findOne(@Param('id') id: number) {
        return await this.showService.findOne(id);
    }

    // 공연 등록
    @Roles(Role.Admin)
    @Post("register")
    async register(@Body() showDto: ShowDto) {
        const show = await this.showService.create(showDto);

        return { message: "공연 등록이 완료되었습니다", show };
    }


}
