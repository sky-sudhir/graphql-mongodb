import { StudentService } from 'src/student/student.service';
import { AssignLessonToStudents } from './assign-lesson-to-student.input';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './lesson.input';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}

  @Query((returns) => LessonType)
  lesson(@Args('id') id: string) {
    return this.lessonService.getLesson(id);
  }
  @Query((returns) => [LessonType])
  allLesson() {
    return this.lessonService.getAllLesson();
  }

  @Mutation((returns) => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ) {
    return this.lessonService.createLesson(createLessonInput);
  }

  @Mutation((returns) => LessonType)
  assignLessonToStudents(
    @Args('assignLessonToStudents')
    assignLessonToStudent: AssignLessonToStudents,
  ) {
    const { lessonId, studentIds } = assignLessonToStudent;
    return this.lessonService.assignLessonToStudents(lessonId, studentIds);
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    console.log(lesson, 'dddddddddddddd');
    return await this.studentService.getManyStudents(lesson.students);
  }
}
