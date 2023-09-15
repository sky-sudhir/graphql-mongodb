import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateStudentInput } from './create-student.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    private myDataSource: DataSource,
  ) {}

  async getAllStudent(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async getStudentById(id: string): Promise<Student> {
    return this.studentRepository.findOne({ where: { id } });
  }

  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    const { firstName, lastName } = createStudentInput;

    const student = this.studentRepository.create({
      firstName,
      lastName,
      id: uuid(),
    });
    return this.studentRepository.save(student);
  }
  async getManyStudents(studentIds: string[]): Promise<Student[]> {
    const res = await this.myDataSource.getMongoRepository(Student).find({
      where: {
        id: { $in: studentIds },
      },
    });
    return res ?? [];
  }
}
